import { Stack } from "@mui/material";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import SensorInfo from "@components/Sensors/SensorInfo";
import SensorList from "@components/Sensors/SensorList";
import { USERTABLE_WIDTH } from "@components/AdminMonitoring/UserTable";

const SensorDrawer = ({ sensors, selectedSensor, setSelectedSensor }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpenDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Stack
      sx={{
        position: "absolute",
        left: isOpen ? `${USERTABLE_WIDTH}px` : `${USERTABLE_WIDTH - 450}px`, // 상태에 따라 left 변경
        width: "450px",
        height: "100%",
        backgroundColor: "white",
        zIndex: "3",
        transition: "left 0.3s ease",
      }}
    >
      <Stack sx={{ width: "100%", height: "100%", position: "relative" }}>
        <SensorInfo selectedSensor={selectedSensor} />
        <SensorList />
        <Stack
          sx={{
            position: "absolute",
            right: "-40px",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "white",
            height: "60px",
            borderRadius: "0 10px 10px 0",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            "& > svg": {
              color: grey[600],
              width: "32px",
              height: "32px",
            },
          }}
          onClick={toggleOpenDrawer}
        >
          {isOpen ? <ChevronLeft /> : <ChevronRight />}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SensorDrawer;
