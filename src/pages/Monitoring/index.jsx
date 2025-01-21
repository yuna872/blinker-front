import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";
import Legend, { STATUS } from "../../components/Monitoring/Legend";

const Monitoring = () => {
  const [signalList, setSignalList] = useState([]);
  const [map, setMap] = useState(null);
  const [clusterer, setClusterer] = useState(null);
  const [isRoadviewActive, setIsRoadviewActive] = useState(false);
  const [roadviewPosition, setRoadviewPosition] = useState(null);

  const mapContainerRef = useRef(null);
  const roadviewContainerRef = useRef(null);

  // 지도 및 로드뷰 초기화
  useEffect(() => {
    if (typeof window.kakao !== "undefined") {
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.2803, 127.0181),
        level: 6,
      };

      const mapInstance = new window.kakao.maps.Map(
        mapContainerRef.current,
        mapOption
      );
      setMap(mapInstance);

      const clustererInstance = new window.kakao.maps.MarkerClusterer({
        map: mapInstance,
        gridSize: 35,
        averageCenter: true,
        minLevel: 6,
        styles: [
          {
            width: "53px",
            height: "52px",
            background: "rgba(255, 153, 0, 0.7)",
            color: "#fff",
            textAlign: "center",
            lineHeight: "54px",
            borderRadius: "50%",
          },
        ],
      });
      setClusterer(clustererInstance);
    } else {
      console.error("Kakao map library not loaded.");
    }
  }, []);

  // API 호출 및 마커 추가
  useEffect(() => {
    if (map && clusterer) {
      fetch("http://localhost:8080/api/sensors", {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data.response)) {
            setSignalList(data.response);

            const markers = data.response.map((signal) => {
              if (!signal.latitude || !signal.longitude) return null;

              const position = new window.kakao.maps.LatLng(
                signal.latitude,
                signal.longitude
              );
              const markerImage = new window.kakao.maps.MarkerImage(
                `/images/marker-${STATUS[signal.status]}-icon.png`,
                new window.kakao.maps.Size(20, 35)
              );

              const marker = new window.kakao.maps.Marker({
                position,
                image: markerImage,
              });

              // 마커 클릭 이벤트 추가
              window.kakao.maps.event.addListener(marker, "click", function () {
                setRoadviewPosition(position); // 로드뷰 좌표 저장
                alert(
                  `센서 ID: ${signal.sensorId}\n상태: ${signal.status}\n주소: ${signal.address}`
                );
              });

              return marker;
            });

            // 유효한 마커만 클러스터러에 추가
            clusterer.addMarkers(markers.filter(Boolean));
          } else {
            console.error("Unexpected data format:", data);
          }
        })
        .catch((error) => console.error("Error fetching sensor data:", error));
    }
  }, [map, clusterer]);

  // 로드뷰 보기 버튼 클릭 시 위치 설정
  const toggleView = () => {
    setIsRoadviewActive((prev) => !prev);
  };

  return (
    <div>
      <Header />
      <Stack sx={{ flexDirection: "row" }}>
        {/* 신호기 목록 */}
        <Stack>
          <Typography>신호기 목록</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>주소</TableCell>
                <TableCell>버튼 클릭</TableCell>
                <TableCell>위치 안내</TableCell>
                <TableCell>신호 안내</TableCell>
                <TableCell>생성일</TableCell>
                <TableCell>상태</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {signalList.map((signal) => (
                <TableRow key={signal.sensorId} className="signal-card">
                  <TableCell>{signal.sensorId}</TableCell>
                  <TableCell>{signal.address}</TableCell>
                  <TableCell>{signal.buttonClickCount}</TableCell>
                  <TableCell>{signal.locationGuideCount}</TableCell>
                  <TableCell>{signal.signalGuideCount}</TableCell>
                  <TableCell>
                    {new Date(signal.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Typography
                      className={`status-icon ${STATUS[signal.status]}`}
                    ></Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Stack>
        {/* 카카오맵 */}
      </Stack>
      <div>
        <section className="map-container">
          <div
            ref={mapContainerRef}
            style={{ display: isRoadviewActive ? "none" : "block" }}
            className="map"
          ></div>
          <div
            ref={roadviewContainerRef}
            style={{ display: isRoadviewActive ? "block" : "none" }}
            className="roadview"
          ></div>
          <button onClick={toggleView} className="toggle-view">
            {isRoadviewActive ? "지도 보기" : "로드뷰 보기"}
          </button>
          <Legend />
        </section>
      </div>
    </div>
  );
};

export default Monitoring;
