import { Stack, IconButton } from "@mui/material";
import { ArrowForward, ArrowBack } from "@mui/icons-material";
import UserTable from "@components/Group/UserTable";
import { GNB_HEIGHT } from "@layouts/Header";
import UserInfo from "@components/Group/UserInfo";
import SensorList from "@components/Group/SensorList";
import UnregisteredSensorList from "@components/Group/UnregisteredSensorList";
import { theme } from "@styles/theme";
import { useState } from "react";
import AlertDialog from "../../../components/Group/AlertDialog";

const Group = () => {
  const [selectedUser, setSelectedUser] = useState();

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  console.log(selectedUser);

  return (
    <Stack
      sx={{ flexDirection: "row", height: `calc(100vh - ${GNB_HEIGHT}px)` }}
    >
      <UserTable
        setSelectedUser={setSelectedUser}
        selectedUser={selectedUser}
        handleOpenDialog={handleOpenDialog}
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
      <AlertDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        selectedUser={selectedUser}
      />
    </Stack>
  );
};

export default Group;
