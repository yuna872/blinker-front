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
import FaultInfoTabPanel from "./FaultInfoTabPanel";

const SensorDetailsDialog = ({ open, handleClose }) => {
  const [tabValue, setTabValue] = useState("FAULT_INFO");
  const handleChangeTabValue = (_, newValue) => {
    setTabValue(newValue);
  };
  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
      <Stack sx={{ backgroundColor: theme.palette.primary.main }}>
        <DialogTitle sx={{ m: 0, p: 2, color: "white", fontSize: "18px" }}>
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
      <DialogContent sx={{padding : '15px'}}>
        <Tabs
          value={tabValue}
          onChange={handleChangeTabValue}
          aria-label="basic tabs example"
          sx={{ "& .MuiTab-root": { fontSize: "16px" } }}
          variant='fullWidth'
        >
          <Tab label="장애 정보" value="FAULT_INFO" />
          <Tab label="설정" value="SETTINGS" />
          <Tab label="상태 이력" value="STATUS_LOG" />
        </Tabs>
        <Stack sx={{ paddingY: "15px", height: "400px", overflow: "hidden" }}>
          {tabValue === "FAULT_INFO" && <FaultInfoTabPanel />}
          {tabValue === "SETTINGS" && <Stack>설정</Stack>}
          {tabValue === "STATUS_LOG" && <Stack>상태 이력</Stack>}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default SensorDetailsDialog;
