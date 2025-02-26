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
import CreateUserDialog from "@components/Group/CreateUserDialog";
import { useGetUsers } from "@apis/auth/useGetUsers";

const Group = () => {
  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  const handleOpenAlertDialog = () => setOpenAlertDialog(true);
  const handleCloseAlertDialog = () => setOpenAlertDialog(false);

  const [openCreateUserDialog, setOpenCreateUserDialog] = useState(false);

  const handleOpenCreateUserDialog = () => setOpenCreateUserDialog(true);
  const handleCloseCreateUserDialog = () => setOpenCreateUserDialog(false);

  const { data: users } = useGetUsers();

  return (
    <Stack
      sx={{ flexDirection: "row", height: `calc(100vh - ${GNB_HEIGHT}px)` }}
    >
      <UserTable
        users={users}
        handleOpenAlertDialog={handleOpenAlertDialog}
        handleOpenCreateUserDialog={handleOpenCreateUserDialog}
      />
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
      <AlertDialog
        open={openAlertDialog}
        handleClose={handleCloseAlertDialog}
      />
      <CreateUserDialog
        open={openCreateUserDialog}
        handleClose={handleCloseCreateUserDialog}
      />
    </Stack>
  );
};

export default Group;
