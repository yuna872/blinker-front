import { Stack } from "@mui/material";
import UserTable from "../../../components/AdminMonitoring/UserTable";
import SensorList from "../../../components/Settings/SensorList";
import { GNB_HEIGHT } from "../../../layouts/Header";
import SensorDetails from "../../../components/Settings/SensorDetails";

const Settings = () => {
  return (
    <Stack
      sx={{ flexDirection: "row", height: `calc(100vh - ${GNB_HEIGHT}px)` }}
    >
      <UserTable />
      <SensorList />
      <SensorDetails />
    </Stack>
  );
};

export default Settings;
