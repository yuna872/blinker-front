import { Stack, IconButton } from "@mui/material";
import { ArrowForward, ArrowBack } from "@mui/icons-material";
import UserTable from "@components/AdminMonitoring/UserTable";
import { GNB_HEIGHT } from "@layouts/Header";
import UserInfo from "@components/Group/UserInfo";
import SensorList from "@components/Group/SensorList";
import UnregisteredSensorList from "@components/Group/UnregisteredSensorList";
import { theme } from "@styles/theme";
import { useState } from "react";

const Group = () => {
  const [selectedUser, setSelectedUser] = useState();

  return (
    <Stack
      sx={{ flexDirection: "row", height: `calc(100vh - ${GNB_HEIGHT}px)` }}
    >
      <UserTable
        setSelectedUser={setSelectedUser}
        selectedUser={selectedUser}
      />
      <Stack sx={{ overflow: "hidden" }}>
        <UserInfo user={selectedUser} />
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
