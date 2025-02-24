import { IconButton, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Refresh, Traffic } from "@mui/icons-material";
import dayjs from "dayjs";
import Title from "@components/Title";

import { theme } from "@styles/theme";
import { useState } from "react";
import SensorDetailsDialog from "./SensorDetailsDialog";

const TableHeaderStyle = {
  backgroundColor: grey[50],
  fontWeight: 600,
  whiteSpace: "nowrap",
  flexDirection: "row",
  padding: "16px",
  borderBottom: `1px solid ${grey[200]}`,
  "& > .MuiStack-root": {
    justifyContent: "center",
    marginTop: 0,
    fontSize: "14px",
  },
};

const TableRowStyle = {
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  flexDirection: "row",
  padding: "16px",
  alignItems: "center",
  borderBottom: `1px solid ${grey[200]}`,
  backgroundColor: "white",
  "& > .MuiStack-root": {
    justifyContent: "center",
    marginTop: 0,
    fontSize: "14px",
  },
};

const SensorList = ({ sensorGroups, setSelectedSensor, selectedSensor }) => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const handleOpenDetailsDialog = () => {
    setOpenDetailsDialog(true);
  };

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
  };

  const handleClickSensor = (sensor) => {
    setSelectedSensor(sensor);
  };

  const handleClickRefresh = () => {
    console.log("refresh");
  };

  console.log(sensorGroups, "groups");

  return (
    <Stack sx={{ border: `1px solid ${grey[300]}`, overflow: "hidden" }}>
      <Title title="신호기 목록">
        <IconButton color="primary" onClick={handleClickRefresh}>
          <Refresh />
        </IconButton>
      </Title>
      <Stack
        sx={{
          margin: "10px",
          borderBottom: `1px solid ${grey[200]}`,
          borderTop: `1px solid ${grey[200]}`,
        }}
      >
        {/* Header */}
        <Stack sx={TableHeaderStyle}>
          <Stack sx={{ width: "30px", maxWidth: "30px" }}>id</Stack>
          <Stack sx={{ width: "220px", maxWidth: "220px" }}>주소</Stack>
          <Stack sx={{ width: "50px", maxWidth: "50px" }}>버튼</Stack>
          <Stack sx={{ width: "50px", maxWidth: "50px" }}>위치</Stack>
          <Stack sx={{ width: "50px", maxWidth: "50px" }}>신호</Stack>
          <Stack sx={{ width: "180px", maxWidth: "180px" }}>수정일</Stack>
          <Stack sx={{ width: "50px", maxWidth: "50px" }}>상태</Stack>
        </Stack>
        {/* Body */}
        <Stack
          sx={{
            backgroundColor: grey[300],
          }}
        >
          {sensorGroups?.map((group) => {
            console.log(group);
            return group.sensors.map((sensor, idx) => {
              const selected = sensor.sensorId === selectedSensor?.sensorId;
              return (
                <Stack
                  spacing={1}
                  key={sensor.sensorId}
                  sx={{ ...TableRowStyle, marginLeft: idx > 0 ? "20px" : "0" }}
                  onClick={() => handleClickSensor(sensor)}
                  selected={selected}
                >
                  <Stack sx={{ width: "30px", maxWidth: "30px" }}>
                    {/* TODO: order 정보 추가하기 */}
                    1-{sensor.groupPositionNumber}
                  </Stack>
                  <Stack sx={{ width: "220px", maxWidth: "220px" }}>
                    {"주소는 내가 만들어"}
                  </Stack>
                  <Stack sx={{ width: "50px", maxWidth: "50px" }}>
                    {sensor.buttonCount}
                  </Stack>
                  <Stack sx={{ width: "50px", maxWidth: "50px" }}>
                    {sensor.positionGuideCount}
                  </Stack>
                  <Stack sx={{ width: "50px", maxWidth: "50px" }}>
                    {sensor.signalGuideCount}
                  </Stack>
                  <Stack sx={{ width: "180px", maxWidth: "180px" }}>
                    {dayjs(sensor.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
                  </Stack>
                  <Stack sx={{ width: "50px", maxWidth: "50px" }}>
                    {/* TODO: 상태 정보 반영하기 */}
                    <Traffic
                      sx={{
                        color: `${theme.palette.status[sensor.status]}`,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDetailsDialog();
                      }}
                    />
                  </Stack>
                </Stack>
              );
            });
          })}
        </Stack>
      </Stack>
      <SensorDetailsDialog
        open={openDetailsDialog}
        handleClose={handleCloseDetailsDialog}
      />
    </Stack>
  );
};

export default SensorList;
