import React from "react";
import { GNB_HEIGHT } from "@layouts/Header";
import { Stack } from "@mui/material";

import { useGetSensorGroups } from "@apis/sensor/useGetSensorGroups";

import Loading from "@components/Loading";
import SensorList from "./components/SensorList";
import KakaoMap from "./components/KakaoMap";

const Monitoring = () => {
  const { data: sensorGroups, isLoading, refetch } = useGetSensorGroups();

  if (isLoading) return <Loading />;
  const sensors = sensorGroups.flatMap((v) => v.sensors);

  return (
    <Stack
      sx={{ flexDirection: "row", height: `calc(100vh - ${GNB_HEIGHT}px)` }}
    >
      {/* 신호기 목록 */}
      <SensorList sensorGroups={sensorGroups} refetch={refetch} />
      {/* 카카오맵 */}
      <KakaoMap sensors={sensors} />
    </Stack>
  );
};

export default Monitoring;
