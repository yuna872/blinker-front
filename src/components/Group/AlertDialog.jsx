import { useDeleteUser } from "@apis/auth/useDeleteUser";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { showToast } from "@utils/toast";
import { useSelector } from "react-redux";

const AlertDialog = ({ open, handleClose }) => {
  const selectedUser = useSelector((state) => state.selectedUser);
  const { mutateAsync: deleteUser } = useDeleteUser();

  const handleDeleteUser = async () => {
    console.log("gg");
    try {
      await deleteUser(selectedUser?.appUserId).then((data) => {
        console.log(data);
        if (data.code === "SUCCESS") {
          showToast.success("삭제 되었습니다.");
          handleClose();
        }
      });
    } catch (error) {
      console.error(error);
      // showToast.error();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"유저 삭제 확인"}</DialogTitle>
      <DialogContent>
        <Typography>{`ID: ${selectedUser?.userId}`}</Typography>
        <Typography>{` Name: ${selectedUser?.username}`}</Typography>
        <Typography>
          해당 유저를 삭제하면 복구할 수 없습니다. 계속 진행하시겠습니까?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button onClick={handleDeleteUser}>삭제</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
