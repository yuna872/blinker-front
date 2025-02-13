import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

const AlertDialog = ({ open, handleClose, selectedUser }) => {
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
        <Typography>{` Name: ${selectedUser?.userName}`}</Typography>
        <Typography>
          해당 유저를 삭제하면 복구할 수 없습니다. 계속 진행하시겠습니까?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button onClick={handleClose}>삭제</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
