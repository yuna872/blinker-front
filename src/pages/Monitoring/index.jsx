import React, { useState } from "react";
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

const Monitoring = () => {
  const [sensors, setSensors] = useState(dummySignalLights);
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSensor, setSelectedSensorState] = useState();
  const [center, setCenter] = useState({ lat: 37.2803, lng: 127.0181 });
  const [address, setAddress] = useState("");

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmitAddress = () => {
    console.log(address);
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
                  <MarkerClusterer
                    averageCenter={true}
                    minLevel={6}
                    gridSize={35}
                  >
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
                          {selected && (
                            <Stack
                              sx={{
                                width: "100%",
                                "& > p": { fontSize: "11px" },
                              }}
                            >
                              <Typography>
                                해당 기기 번호 (마스터 xX번)
                              </Typography>
                              <Stack
                                sx={{
                                  "& > p": { fontSize: "11px" },
                                }}
                              >
                                <Typography>
                                  기기 위치: {sensor.address}
                                </Typography>
                                <Typography>
                                  마지막 작동시간: {"마지막 작동시간"}
                                </Typography>
                                <Typography>
                                  동작 상태: {sensor.status}
                                </Typography>
                              </Stack>
                              <Typography sx={{ fontSize: "10px" }}>
                                -----------
                              </Typography>
                              <Typography sx={{ fontSize: "10px" }}>
                                메모
                              </Typography>
                              <input
                                type="text"
                                id="info-window-memo"
                                style={{
                                  border: "none",
                                  outline: "none",
                                  fontSize: "10px",
                                }}
                                placeholder="간단한 메모 작성"
                              />
                            </Stack>
                          )}
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
