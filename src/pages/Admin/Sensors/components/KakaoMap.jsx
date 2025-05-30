import { GNB_HEIGHT } from "@layouts/Header";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import { setMapPosition } from "@store/mapPositionSlice";
import {
  resetSelectedSensor,
  setSelectedSensorState,
} from "@store/selectedSensorSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Map,
  MapMarker,
  MapTypeId,
  MarkerClusterer,
  Roadview,
  ZoomControl,
} from "react-kakao-maps-sdk";
import { ChevronRight, Close } from "@mui/icons-material";

import greenMarker from "@assets/images/marker-green.png";
import redMarker from "@assets/images/marker-red.png";
import yellowMarker from "@assets/images/marker-yellow.png";
import Title from "@components/Title";
import { usePatchSensorLocation } from "@apis/sensor/usePatchSensorLocation";
import { showToast } from "@utils/toast";
import InfoWindow from "@pages/Admin/Monitoring/components/InfoWindow";
import AddressSearchBar from "@components/AddressSearchBar";
import Legend from "@components/Legend";

const SensorsKakaoMap = ({ sensors }) => {
  const dispatch = useDispatch();
  const selectedSensor = useSelector((state) => state.selectedSensor);
  const selectedUser = useSelector((state) => state.selectedUser);
  const mapPosition = useSelector((state) => state.mapPosition);

  const [map, setMap] = useState();
  // 로드뷰 기능
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  // 위치 수정 기능
  const [isDraggable, setIsDraggable] = useState(false);
  const [draggedPosition, setDraggedPosition] = useState();

  const handleClickMarker = (sensor) => {
    if (sensor) {
      dispatch(setSelectedSensorState(sensor));
      setDraggedPosition({
        lat: sensor.latitude,
        lng: sensor.longitude,
      });
      dispatch(
        setMapPosition({
          lat: sensor.latitude,
          lng: sensor.longitude,
        })
      );
    }
  };

  const handleCloseInfoWindow = () => {
    setIsActive(false);
    setIsVisible(false);
  };

  const { mutateAsync: patchSensorLocation } = usePatchSensorLocation(
    selectedSensor?.sensorId,
    selectedUser?.appUserId
  );

  // 새로운 위치 저장
  const handleSaveNewPosition = async () => {
    if (!draggedPosition) return;
    await patchSensorLocation({
      sensorId: selectedSensor.sensorId,
      latitude: draggedPosition.lat,
      longitude: draggedPosition.lng,
    })
      .then((res) => {
        showToast.success("위치가 변경되었습니다.");

        // selectedSensor 업데이트
        let relocatedSensor = sensors?.find(
          (sensor) => sensor.sensorId === selectedSensor.sensorId
        );
        relocatedSensor = {
          ...relocatedSensor,
          latitude: draggedPosition.lat,
          longitude: draggedPosition.lng,
        };
        dispatch(setSelectedSensorState(relocatedSensor));

        // drag 관련 변수들 초기화
        setIsDraggable(false);
        setDraggedPosition();
      })
      .catch((err) => {
        showToast.error("문제가 발생했습니다.");
      });
  };

  // 위치 편집 모드 종료 시 selectedSensor 기준으로 초기화
  const handleClickOffDraggable = () => {
    setIsDraggable(false);
    setDraggedPosition();
    dispatch(
      setMapPosition({
        lat: selectedSensor.latitude,
        lng: selectedSensor.longitude,
      })
    );
  };

  useEffect(() => {
    setIsDraggable(false);
  }, [selectedSensor]);

  return (
    <Stack
      sx={{
        flex: "1",
        position: "relative",
        maxHeight: `calc(100vh - ${GNB_HEIGHT}px)`,
      }}
    >
      <Title title="지도보기">
        <AddressSearchBar map={map} />
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
            onClick={(_, mouseEvent) => {
              const latlng = mouseEvent.latLng;
              dispatch(resetSelectedSensor());
              dispatch(
                setMapPosition({
                  lat: latlng.getLat(),
                  lng: latlng.getLng(),
                })
              );
            }}
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
                    <IconButton onClick={handleCloseInfoWindow} size="small">
                      <Close />
                    </IconButton>
                  </Stack>
                </MapMarker>
              </>
            ) : (
              <MarkerClusterer averageCenter={true} minLevel={10}>
                {selectedSensor && (
                  <MapMarker
                    position={{
                      lat:
                        isDraggable && draggedPosition
                          ? draggedPosition.lat
                          : selectedSensor.latitude,
                      lng:
                        isDraggable && draggedPosition
                          ? draggedPosition.lng
                          : selectedSensor.longitude,
                    }}
                    image={{
                      src: selectedSensor.needUpdate
                        ? yellowMarker
                        : selectedSensor.status === "정상"
                          ? greenMarker
                          : redMarker,
                      size: {
                        width: 35,
                        height: 35,
                      },
                    }}
                    onClick={() => handleClickMarker(selectedSensor)}
                    draggable={isDraggable}
                    onDragEnd={(marker) => {
                      const newPosition = {
                        lat: marker.getPosition().getLat(),
                        lng: marker.getPosition().getLng(),
                      };
                      setDraggedPosition(newPosition);
                      dispatch(setMapPosition(newPosition));
                    }}
                  >
                    <InfoWindow
                      key={isDraggable ? "drag" : "view"}
                      isDraggable={isDraggable}
                      setIsDraggable={setIsDraggable}
                      draggedPosition={draggedPosition}
                      handleSaveNewPosition={handleSaveNewPosition}
                      handleClickOffDraggable={handleClickOffDraggable}
                    />
                  </MapMarker>
                )}
              </MarkerClusterer>
            )}
          </Map>
          <Legend />
        </>
      )}
      {/* road view toggle button */}
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
  );
};

export default SensorsKakaoMap;
