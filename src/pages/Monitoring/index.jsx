import React, { useEffect, useRef, useState } from "react";
import { GNB_HEIGHT } from "../../layouts/Header";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import Legend from "../../components/Monitoring/Legend";
import {
  Map,
  MapMarker,
  MapTypeId,
  MarkerClusterer,
  Roadview,
  ZoomControl,
} from "react-kakao-maps-sdk";
import Title from "@components/Title";
import greenMarker from "@assets/images/marker-green.png";
import greyMarker from "@assets/images/marker-grey.png";
import redMarker from "@assets/images/marker-red.png";
import SensorList from "@components/Monitoring/SensorList";
import { ChevronRight, Close } from "@mui/icons-material";
import UserLayout from "@layouts/UserLayout";
import { dummySignalLights } from "./dummy";
import AddressSearchBar from "@components/Monitoring/AddressSearchBar";
import InfoWindow from "@components/Monitoring/InfoWindow";

const Monitoring = () => {
  const [map, setMap] = useState();
  const [sensors, setSensors] = useState(dummySignalLights);
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSensor, setSelectedSensorState] = useState();
  const [center, setCenter] = useState({ lat: 37.2803, lng: 127.0181 });
  const [address, setAddress] = useState("");
  const mapRef = useRef();

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmitAddress = () => {
    setIsActive(false);
    setIsVisible(false);

    const geocoder = new kakao.maps.services.Geocoder();

    let callback = (result, status) => {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        setCenter({ lat: result[0].y, lng: result[0].x });
      }

      // 마커가 표시될 위치입니다
      var markerPosition = new kakao.maps.LatLng(result[0].y, result[0].x);

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);
    };

    geocoder.addressSearch(`${address}`, callback);
  };

  const handleClickMarker = (sensor) => {
    setSelectedSensor(sensor);
  };

  const setSelectedSensor = (sensor) => {
    setSelectedSensorState(sensor);
    if (sensor) {
      setCenter({
        lat: sensor.latitude,
        lng: sensor.longitude,
      });
    }
  };

  const handleClickCloseInfoWindow = () => {
    setIsActive(false);
    setIsVisible(false);
  };

  return (
    <UserLayout>
      <Stack
        sx={{ flexDirection: "row", height: `calc(100vh - ${GNB_HEIGHT}px)` }}
      >
        {/* 신호기 목록 */}
        <SensorList
          sensors={sensors}
          selectedSensor={selectedSensor}
          setSelectedSensor={setSelectedSensor}
        />
        {/* 카카오맵 */}
        <Stack
          sx={{
            flex: "1",
            position: "relative",
            maxHeight: `calc(100vh - ${GNB_HEIGHT}px)`,
          }}
        >
          <Title title="지도보기">
            <AddressSearchBar
              address={address}
              handleChangeAddress={handleChangeAddress}
              handleSubmitAddress={handleSubmitAddress}
            />
          </Title>
          {isVisible ? (
            <Roadview
              position={{
                lat: center.lat,
                lng: center.lng,
                radius: 50,
              }}
              style={{ width: "100%", height: `calc(100vh - ${GNB_HEIGHT}px)` }}
            />
          ) : (
            <>
              <Map
                center={center}
                level={6}
                style={{
                  width: "100%",
                  height: `calc(100vh - ${GNB_HEIGHT}px)`,
                }}
                isPanto={true}
                onCreate={setMap}
              >
                <ZoomControl />
                {/* 동동이 */}
                {isActive ? (
                  <>
                    <MapTypeId type={kakao.maps.MapTypeId.ROADVIEW} />
                    <MapMarker
                      position={center}
                      draggable={true}
                      onDragEnd={(marker) => {
                        setCenter({
                          lat: marker.getPosition().getLat(),
                          lng: marker.getPosition().getLng(),
                        });
                      }}
                      image={{
                        src: "https://t1.daumcdn.net/localimg/localimages/07/2018/pc/roadview_minimap_wk_2018.png",
                        size: { width: 26, height: 46 },
                        options: {
                          spriteSize: { width: 1666, height: 168 },
                          spriteOrigin: { x: 705, y: 114 },
                          offset: { x: 13, y: 46 },
                        },
                      }}
                    >
                      <Stack
                        flexDirection="row"
                        sx={{ width: "152px", cursor: "pointer" }}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Stack
                          flexDirection="row"
                          sx={{
                            paddingLeft: "5px",
                            ":hover": {
                              borderBottom: "1px solid black",
                            },
                          }}
                          onClick={() => {
                            setIsVisible(true);
                          }}
                        >
                          <Typography>로드뷰 보기</Typography>
                          <ChevronRight />
                        </Stack>

                        <IconButton
                          onClick={handleClickCloseInfoWindow}
                          size="small"
                        >
                          <Close />
                        </IconButton>
                      </Stack>
                    </MapMarker>
                  </>
                ) : (
                  <MarkerClusterer averageCenter={true} minLevel={10}>
                    {sensors.map((sensor) => {
                      const selected =
                        sensor.sensorId === selectedSensor?.sensorId;
                      return (
                        <MapMarker
                          key={`${sensor.latitude}-${sensor.longitude}`}
                          position={{
                            lat: sensor.latitude,
                            lng: sensor.longitude,
                          }}
                          image={{
                            src:
                              sensor.status === "정상"
                                ? greenMarker
                                : sensor.status === "오류"
                                ? redMarker
                                : greyMarker,
                            size: {
                              width: selected ? 35 : 30,
                              height: selected ? 35 : 30,
                            },
                          }}
                          onClick={() => handleClickMarker(sensor)}
                        >
                          {selected && <InfoWindow sensor={sensor} />}
                        </MapMarker>
                      );
                    })}
                  </MarkerClusterer>
                )}
              </Map>
              <Legend />
            </>
          )}
          {(!isActive || isVisible) && (
            <Button
              onClick={() => {
                if (!isActive) setIsActive(true);
                if (isVisible) setIsVisible(false);
              }}
              variant="contained"
              color="secondary"
              sx={{
                position: "absolute",
                top: "65px",
                right: isVisible ? "10px" : "50px",
                zIndex: 2,
              }}
            >
              {isActive ? "지도 보기" : "로드뷰 보기"}
            </Button>
          )}
        </Stack>
      </Stack>
    </UserLayout>
  );
};

export default Monitoring;
