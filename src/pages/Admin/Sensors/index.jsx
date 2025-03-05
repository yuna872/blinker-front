import { Stack } from "@mui/material";
import UserTable from "@components/AdminMonitoring/UserTable";

import { GNB_HEIGHT } from "@layouts/Header";
import SensorDrawer from "@components/Sensors/SensorDrawer";
import { useState } from "react";
import { useGetUsers } from "@apis/auth/useGetUsers";
import AdminKakaoMap from "@components/AdminMonitoring/AdminKakaoMap";
import { useGetUserSensorGroups } from "@apis/sensor/useGetUserSensorGroups";
import { useSelector } from "react-redux";

const Sensors = () => {
  const [selectedSensor, setSelectedSensor] = useState();
  const selectedUser = useSelector((state) => state.selectedUser);

  const { data: users } = useGetUsers();
  const { data: sensorGroups } = useGetUserSensorGroups(
    selectedUser?.appUserId
  );

  const sensors = sensorGroups?.flatMap((v) => v.sensors);

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
          zIndex: "4",
          backgroundColor: "white",
        }}
      >
        <UserTable users={users} />
      </Stack>
      <SensorDrawer
        sensors={sensors}
        selectedSensor={selectedSensor}
        setSelectedSensor={setSelectedSensor}
      />
      <AdminKakaoMap sensors={sensors} />
    </Stack>
  );
};

export default Sensors;
