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
import SettingsTabPanel from "./SettingsTabPanel";
import StatusHistoryTabPanel from "./StatusHistoryTabPanel";
import { useSelector } from "react-redux";

const SensorDetailsDialog = ({ open, handleClose}) => {
  const selectedSensor = useSelector((state) => state.selectedSensor);

  const [tabValue, setTabValue] = useState("FAULT_INFO");
  const handleChangeTabValue = (_, newValue) => {
    setTabValue(newValue);
  };

  console.log(selectedSensor, 'dialog')


  if(!selectedSensor) return null
  return (
    <Dialog onClose={handleClose} open={open} maxWidth="lg" fullWidth>
      <Stack sx={{ backgroundColor: theme.palette.primary.main }}>
        <DialogTitle sx={{ m: 0, p: 2, color: "white", fontSize: "18px" }}>
          {`신호기 ${"그룹아이디"}  ${
            selectedSensor.groupPositionNumber > 0
              ? `슬레이브 ${selectedSensor.groupPositionNumber}번`
              : "마스터"
          } - ${selectedSensor.address}`}
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
      <DialogContent sx={{ padding: "15px" }}>
        <Tabs
          value={tabValue}
          onChange={handleChangeTabValue}
          aria-label="basic tabs example"
          sx={{ "& .MuiTab-root": { fontSize: "16px" } }}
          variant="fullWidth"
        >
          <Tab label="장애 정보" value="FAULT_INFO" />
          <Tab label="설정" value="SETTINGS" />
          <Tab label="상태 이력" value="STATUS_LOG" />
        </Tabs>
        <Stack sx={{ padding: "15px", maxHeight: "500px", height: "500px" }}>
          {tabValue === "FAULT_INFO" && <FaultInfoTabPanel />}
          {tabValue === "SETTINGS" && <SettingsTabPanel />}
          {tabValue === "STATUS_LOG" && <StatusHistoryTabPanel />}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default SensorDetailsDialog;
