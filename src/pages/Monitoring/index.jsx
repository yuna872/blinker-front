import React, { useEffect, useState } from "react";
import "./Main.css";

const Monitoring = () => {
  const [signalList, setSignalList] = useState([]);
  const [map, setMap] = useState(null);
  const [clusterer, setClusterer] = useState(null);
  const [roadview, setRoadview] = useState(null);
  const [roadviewClient, setRoadviewClient] = useState(null);
  const [isRoadviewActive, setIsRoadviewActive] = useState(false);
  const [roadviewPosition, setRoadviewPosition] = useState(null);

  const statusColors = {
    정상: "green",
    오류: "red",
    미접속: "yellow",
  };

  // 지도 및 로드뷰 초기화
  useEffect(() => {
    if (typeof window.kakao !== "undefined") {
      const mapContainer = document.getElementById("map");
      const roadviewContainer = document.getElementById("roadview");
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.2803, 127.0181),
        level: 6,
      };

      const mapInstance = new window.kakao.maps.Map(mapContainer, mapOption);
      setMap(mapInstance);

      // 클러스터러 생성
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

      // 로드뷰 및 로드뷰 클라이언트 객체 초기화
      const roadviewInstance = new window.kakao.maps.Roadview(
        roadviewContainer
      );
      const roadviewClientInstance = new window.kakao.maps.RoadviewClient();
      setRoadview(roadviewInstance);
      setRoadviewClient(roadviewClientInstance);
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
                `/images/marker-${statusColors[signal.status]}-icon.png`,
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
    if (roadviewClient && roadviewPosition) {
      // 로드뷰의 위치를 마커 클릭 위치로 설정
      roadviewClient.getNearestPanoId(roadviewPosition, 50, function (panoId) {
        if (panoId) {
          roadview.setPanoId(panoId, roadviewPosition); // 로드뷰 파노 ID와 위치 설정
        }
      });
    }
    setIsRoadviewActive((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("Authorization");
    alert("로그아웃 되었습니다. 로그인 페이지로 이동합니다.");
    window.location.href = "/login";
  };

  return (
    <div>
      <header>
        <div className="gnb">
          <div className="logo">Osan 스마트 음향 신호기 모니터링</div>
          <div className="logout">
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        </div>
      </header>
      <main>
        <aside className="lnb">
          <div className="lnb-header">
            <h2>신호기 목록</h2>
          </div>
          <div className="signal-index">
            <div>ID</div>
            <div>주소</div>
            <div>버튼 클릭</div>
            <div>위치 안내</div>
            <div>신호 안내</div>
            <div>생성일</div>
            <div>상태</div>
          </div>
          <div className="signal-list">
            {signalList.map((signal) => (
              <div key={signal.sensorId} className="signal-card">
                <div>{signal.sensorId}</div>
                <div>{signal.address}</div>
                <div>{signal.buttonClickCount}</div>
                <div>{signal.locationGuideCount}</div>
                <div>{signal.signalGuideCount}</div>
                <div>{new Date(signal.createdAt).toLocaleString()}</div>
                <div>
                  <span
                    className={`status-icon ${statusColors[signal.status]}`}
                  ></span>
                </div>
              </div>
            ))}
          </div>
        </aside>
        <section className="map-container">
          <div
            style={{ display: isRoadviewActive ? "none" : "block" }}
            id="map"
            className="map"
          ></div>
          <div
            style={{ display: isRoadviewActive ? "block" : "none" }}
            id="roadview"
            className="roadview"
          ></div>
          <button onClick={toggleView} className="toggle-view">
            {isRoadviewActive ? "지도 보기" : "로드뷰 보기"}
          </button>
          <div className="legend">
            <h3>범례</h3>
            <ul>
              <li>
                <span className="legend-circle green"></span> 정상
              </li>
              <li>
                <span className="legend-circle red"></span> 오류
              </li>
              <li>
                <span className="legend-circle yellow"></span> 미접속
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Monitoring;
