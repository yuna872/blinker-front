import {
  IconButton,
  DialogTitle,
  Dialog,
  DialogContent,
  Tabs,
  Tab,
  Stack,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useState } from "react";
import { theme } from "@styles/theme";

const SensorDetailsDialog = ({ open, handleClose }) => {
  const [tabValue, setTabValue] = useState("");
  const handleChangeTabValue = (_, newValue) => {
    setTabValue(newValue);
  };
  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
      <Stack sx={{ backgroundColor: theme.palette.primary.main }}>
        <DialogTitle sx={{ m: 0, p: 2, color: "white", fontSize:'18px' }}>
          신호기 + 아이디 + 마스터 or 슬레이브(번호) - 위치
        </DialogTitle>
      </Stack>
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "white",
        }}
      >
        <Close />
      </IconButton>
      <DialogContent>
        <Tabs
          value={tabValue}
          onChange={handleChangeTabValue}
          aria-label="basic tabs example"
        >
          <Tab label="장애 정보" value="장애 정보" />
          <Tab label="설정" value="설정" />
          <Tab label="상태 이력" value="상태 이력" />
        </Tabs>
        {tabValue === "장애 정보" && <Stack>장애 정보</Stack>}
        {tabValue === "설정" && <Stack>설정</Stack>}
        {tabValue === "상태 이력" && <Stack>상태 이력</Stack>}
      </DialogContent>
    </Dialog>
  );
};

export default SensorDetailsDialog;
