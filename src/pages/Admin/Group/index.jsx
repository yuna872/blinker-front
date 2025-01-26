import { Stack, IconButton } from "@mui/material";
import { ArrowForward, ArrowBack } from "@mui/icons-material";
import UserTable from "../../../components/AdminMonitoring/UserTable";
import { GNB_HEIGHT } from "../../../layouts/Header";
import UserInfo from "../../../components/Group/UserInfo";
import SensorList from "../../../components/Group/SensorList";
import UnregisteredSensorList from "../../../components/Group/UnregisteredSensorList";
import { theme } from "../../../styles/theme";

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
      <Stack
        sx={{
          alignItems: "center",
          gap: "15px",
          padding: "10px",
          justifyContent: "center",
        }}
      >
        <IconButton
          color="primary"
          sx={{ backgroundColor: theme.palette.secondary.main }}
        >
          <ArrowForward />
        </IconButton>
        <IconButton
          color="primary"
          sx={{ backgroundColor: theme.palette.secondary.main }}
        >
          <ArrowBack />
        </IconButton>
      </Stack>
      <UnregisteredSensorList />
    </Stack>
  );
};

export default Group;
