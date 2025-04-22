import { Stack } from "@mui/material";
import UserTable from "@pages/Admin/Monitoring/components/UserTable";
import SensorList from "@pages/Admin/Settings/components/SensorList";
import { GNB_HEIGHT } from "@layouts/Header";
import SensorDetails from "@pages/Admin/Settings/components/SensorDetails";
import { useGetUsers } from "@apis/auth/useGetUsers";

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
