import { Stack } from "@mui/material";
import UserTable from "@components/AdminMonitoring/UserTable";
import SensorList from "@components/Settings/SensorList";
import { GNB_HEIGHT } from "@layouts/Header";
import SensorDetails from "@components/Settings/SensorDetails";
import { useGetUsers } from "@apis/auth/useGetUsers";
import { useGetUserSensorGroups } from "@apis/sensor/useGetUserSensorGroups";
import { useSelector } from "react-redux";

const Settings = () => {
  const { data: users } = useGetUsers();

  return (
    <Stack
      sx={{ flexDirection: "row", height: `calc(100vh - ${GNB_HEIGHT}px)` }}
    >
      <UserTable users={users} />
      <SensorList />
      <SensorDetails />
    </Stack>
  );
};

export default Settings;
