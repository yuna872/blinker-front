import { Stack } from "@mui/material";
import UserTable, {
  USERTABLE_WIDTH,
} from "@components/AdminMonitoring/UserTable";
import {
  Map,
  MapMarker,
  MarkerClusterer,
  ZoomControl,
} from "react-kakao-maps-sdk";
import { GNB_HEIGHT } from "@layouts/Header";
import greenMarker from "@assets/images/marker-green.png";
import greyMarker from "@assets/images/marker-grey.png";
import redMarker from "@assets/images/marker-red.png";
import SensorDrawer from "@components/AdminMonitoring/SensorDrawer";
import FailureInfo from "@components/AdminMonitoring/FaultInfo";
import { useGetUsers } from "@apis/auth/useGetUsers";
import { useGetUserSensorGroups } from "@apis/sensor/useGetUserSensorGroups";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import InfoWindow from "@components/Monitoring/InfoWindow";
import { setSelectedSensorState } from "@store/selectedSensorSlice";
import { setMapPosition } from "@store/mapPositionSlice";

const AdminMonitoring = () => {
  const dispatch = useDispatch();
  const selectedSensor = useSelector((state) => state.selectedSensor);
  const selectedUser = useSelector((state) => state.selectedUser);
  const [onlyFaulty, setOnlyFaulty] = useState(false);

  const { data: users } = useGetUsers();
  const { data: sensorGroups } = useGetUserSensorGroups(
    selectedUser?.appUserId,
    onlyFaulty
  );

  const handleClickMarker = (sensor) => {
    dispatch(setSelectedSensorState(sensor));
    dispatch(
      setMapPosition({
        lat: sensor.latitude,
        lng: sensor.longitude,
      })
    );
  };

  console.log(sensorGroups, "user sensor");

  return (
    <Stack
      sx={{
        flexDirection: "row",
        position: "relative",
        overflow: "hidden",
        height: `calc(100vh - ${GNB_HEIGHT}px)`,
      }}
    >
      <Stack
        sx={{
          zIndex: "3",
          backgroundColor: "white",
        }}
      >
        <UserTable users={users} />
        <FailureInfo />
      </Stack>
      <SensorDrawer
        sensorGroups={sensorGroups}
        onlyFaulty={onlyFaulty}
        setOnlyFaulty={setOnlyFaulty}
      />
      <Stack
        sx={{
          position: "absolute",
          left: `${USERTABLE_WIDTH}px`,
          width: "100%",
        }}
      >
        <Map
          center={{ lat: 37.2803, lng: 127.0181 }}
          level={6}
          style={{
            width: "100%",
            height: `calc(100vh - ${GNB_HEIGHT}px)`,
          }}
        >
          <ZoomControl />
          <MarkerClusterer averageCenter={true} minLevel={6} gridSize={35}>
            {sensorGroups &&
              sensorGroups
                ?.flatMap((v) => v.sensors)
                .map((sensor) => {
                  const selected =
                    selectedSensor &&
                    sensor.sensorId === selectedSensor.sensorId;
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
                      {selected && <InfoWindow sensorId={sensor.sensorId} />}
                    </MapMarker>
                  );
                })}
          </MarkerClusterer>
        </Map>
      </Stack>
    </Stack>
  );
};

export default AdminMonitoring;
