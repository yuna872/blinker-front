import React, { useState } from "react";
import { GNB_HEIGHT } from "../../layouts/Header";
import { Button, Stack } from "@mui/material";
import Legend from "../../components/Monitoring/Legend";
import {
  Map,
  MapMarker,
  MarkerClusterer,
  Roadview,
  ZoomControl,
} from "react-kakao-maps-sdk";
import Title from "../../components/Title";
import greenMarker from "../../assets/images/marker-green.png";
import yellowMarker from "../../assets/images/marker-yellow.png";
import redMarker from "../../assets/images/marker-red.png";
import { dummySignalLights } from "./dummy";
import SensorList from "../../components/Monitoring/SensorList";

const Monitoring = () => {
  const [sensors, setSensors] = useState(dummySignalLights);
  const [isRoadviewActive, setIsRoadviewActive] = useState(false);
  const [selectedSensor, setSelectedSensorState] = useState();
  const [position, setPosition] = useState({
    center: { lat: 37.2803, lng: 127.0181 },
    isPanto: true,
  });

  const handleClickMarker = (sensor) => {
    setSelectedSensor(sensor);
  };

  // 로드뷰 보기 버튼 클릭 시 위치 설정
  const toggleView = () => {
    setIsRoadviewActive((prev) => !prev);
  };

  const setSelectedSensor = (sensor) => {
    setSelectedSensorState(sensor);
    if (sensor) {
      setPosition({
        center: { lat: sensor.latitude, lng: sensor.longitude },
        isPanto: true,
      });
    }
  };

  return (
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
        <Title title="지도보기" />
        {isRoadviewActive ? (
          <Roadview
            position={{
              lat: selectedSensor.latitude,
              lng: selectedSensor.longitude,
              radius: 50,
            }}
            style={{ width: "100%", height: `calc(100vh - ${GNB_HEIGHT}px)` }}
          />
        ) : (
          <>
            <Map
              center={position.center}
              level={6}
              style={{
                width: "100%",
                height: `calc(100vh - ${GNB_HEIGHT}px)`,
              }}
            >
              <ZoomControl />
              <MarkerClusterer averageCenter={true} minLevel={6} gridSize={35}>
                {sensors.map((sensor) => {
                  const selected = sensor.sensorId === selectedSensor?.sensorId;
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
                            : yellowMarker,
                        size: {
                          width: selected ? 35 : 30,
                          height: selected ? 35 : 30,
                        },
                      }}
                      onClick={() => handleClickMarker(sensor)}
                    >
                      {selected && (
                        <span sx={{ fontSize: "14px", textAlign: "center" }}>
                          {sensor.address}
                        </span>
                      )}
                    </MapMarker>
                  );
                })}
              </MarkerClusterer>
            </Map>
            <Legend />
          </>
        )}
        <Button
          onClick={toggleView}
          variant="contained"
          color="secondary"
          sx={{
            position: "absolute",
            top: "65px",
            right: isRoadviewActive ? "10px" : "50px",
            zIndex: 2,
          }}
        >
          {isRoadviewActive ? "지도 보기" : "로드뷰 보기"}
        </Button>
      </Stack>
    </Stack>
  );
};

export default Monitoring;
