import React, { useRef, useState } from "react";
import { GNB_HEIGHT } from "@layouts/Header";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import Legend from "@components/Monitoring/Legend";
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
import AddressSearchBar from "@components/Monitoring/AddressSearchBar";
import { useGetSensorGroups } from "@apis/sensor/useGetSensorGroups";
import InfoWindow from "@components/Monitoring/InfoWindow";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSensorState } from "@store/selectedSensorSlice";
import { setMapPosition } from "@store/mapPosition";

const Monitoring = () => {
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const selectedSensor = useSelector((state) => state.selectedSensor);
  const mapPosition = useSelector((state) => state.mapPosition);
  const [map, setMap] = useState();
  const mapRef = useRef();

  const { data: sensorGroups, isLoading, refetch } = useGetSensorGroups();

  const handleClickMarker = (sensor) => {
    setSelectedSensor(sensor);
  };

  const setSelectedSensor = (sensor) => {
    if (sensor) {
      dispatch(setSelectedSensorState(sensor));
      dispatch(
        setMapPosition({
          lat: sensor.latitude,
          lng: sensor.longitude,
        })
      );
    }
  };

  const handleClickCloseInfoWindow = () => {
    setIsActive(false);
    setIsVisible(false);
  };

  if (isLoading) return <>...is loading</>;
  if (sensorGroups) {
    const sensors = sensorGroups.flatMap(({ sensorGroupId, sensors }) =>
      sensors.map((sensor) => ({ ...sensor, sensorGroupId }))
    );

    return (
      <UserLayout>
        <Stack
          sx={{ flexDirection: "row", height: `calc(100vh - ${GNB_HEIGHT}px)` }}
        >
          {/* 신호기 목록 */}
          <SensorList sensorGroups={sensorGroups} refetch={refetch} />
          {/* 카카오맵 */}
          <Stack
            sx={{
              flex: "1",
              position: "relative",
              maxHeight: `calc(100vh - ${GNB_HEIGHT}px)`,
            }}
          >
            <Title title="지도보기">
              <AddressSearchBar map={map} setMap={setMap}/>
            </Title>
            {isVisible ? (
              <Roadview
                position={{
                  ...mapPosition,
                  radius: 50,
                }}
                style={{
                  width: "100%",
                  height: `calc(100vh - ${GNB_HEIGHT}px)`,
                }}
              />
            ) : (
              <>
                <Map
                  center={mapPosition}
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
                        position={mapPosition}
                        draggable={true}
                        onDragEnd={(marker) => {
                          dispatch(
                            setMapPosition({
                              lat: marker.getPosition().getLat(),
                              lng: marker.getPosition().getLng(),
                            })
                          );
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
                            key={`${sensor.latitude}-${sensor.longitude}-${sensor.groupPositionNumber}`}
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
                              <InfoWindow sensorId={sensor.sensorId} />
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
  }
};

export default Monitoring;
