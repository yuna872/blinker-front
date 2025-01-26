import { Stack } from "@mui/material";
import UserTable from "../../../components/AdminMonitoring/UserTable";
import { GNB_HEIGHT } from "../../../layouts/Header";
import UserInfo from "../../../components/Group/UserInfo";
import SensorList from "../../../components/Group/SensorList";

const Group = () => {
  return (
    <Stack
      sx={{ flexDirection: "row", height: `calc(100vh - ${GNB_HEIGHT}px)` }}
    >
      <UserTable />
      <Stack sx={{ overflow: "hidden" }}>
        <UserInfo />
        <SensorList />
      </Stack>
    </Stack>
  );
};

export default Group;
