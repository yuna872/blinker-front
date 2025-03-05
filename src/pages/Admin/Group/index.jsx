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
import { usePostSensorGroupToUser } from "@apis/app-user/usePostSensorGroupToUser";
import { useDeleteSensorGroupFromUser } from "@apis/app-user/useDeleteSensorGroupFromUser";
import { showToast } from "@utils/toast";
import { useSelector } from "react-redux";

const Group = () => {
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [openCreateUserDialog, setOpenCreateUserDialog] = useState(false);
  const [unregisteredSensor, setUnregisteredSensor] = useState(null);

  // 유저 삭제 alert dialog
  const handleOpenAlertDialog = () => setOpenAlertDialog(true);
  const handleCloseAlertDialog = () => setOpenAlertDialog(false);
  // 유저 생성 form dialog
  const handleOpenCreateUserDialog = () => setOpenCreateUserDialog(true);
  const handleCloseCreateUserDialog = () => setOpenCreateUserDialog(false);

  const { data: users } = useGetUsers();
  const selectedSensor = useSelector((state) => state.selectedSensor);
  const selectedUser = useSelector((state) => state.selectedUser);
  const { mutateAsync: postSensorGroupToUser } = usePostSensorGroupToUser();
  const { mutateAsync: deleteSensorGroupFromUser } =
    useDeleteSensorGroupFromUser();

  const handleClickArrowForward = async () => {
    if (selectedUser && selectedSensor) {
      try {
        await deleteSensorGroupFromUser({
          appUserId: selectedUser.appUserId,
          sensorGroupId: selectedSensor.sensorGroupId,
        }).then((data) => {
          if (data.code === "SUCCESS") {
            showToast.success("등록 해제되었습니다.");
          }
        });
      } catch (error) {
        showToast.error(error?.response?.data?.message);
      }
    }
  };

  const handleClickArrowBack = async () => {
    if (selectedUser && unregisteredSensor) {
      try {
        await postSensorGroupToUser({
          appUserId: selectedUser.appUserId,
          sensorGroupId: unregisteredSensor.sensorGroupId,
        }).then((data) => {
          if (data.code === "SUCCESS") {
            showToast.success("등록되었습니다.");
          }
        });
      } catch (error) {
        showToast.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <Stack
      sx={{ flexDirection: "row", height: `calc(100vh - ${GNB_HEIGHT}px)` }}
    >
      <UserTable
        users={users}
        handleOpenAlertDialog={handleOpenAlertDialog}
        handleOpenCreateUserDialog={handleOpenCreateUserDialog}
      />
      <Stack>
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
          onClick={handleClickArrowForward}
          sx={{ backgroundColor: theme.palette.secondary.main }}
        >
          <ArrowForward />
        </IconButton>
        <IconButton
          color="primary"
          onClick={handleClickArrowBack}
          sx={{ backgroundColor: theme.palette.secondary.main }}
        >
          <ArrowBack />
        </IconButton>
      </Stack>
      <UnregisteredSensorList
        unregisteredSensor={unregisteredSensor}
        setUnregisteredSensor={setUnregisteredSensor}
      />
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
