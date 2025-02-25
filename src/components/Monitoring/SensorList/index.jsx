import { IconButton, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Refresh, Star, Traffic } from "@mui/icons-material";
import dayjs from "dayjs";
import Title from "@components/Title";
import { theme } from "@styles/theme";
import { useState } from "react";
import SensorDetailsDialog from "../SensorDetailsDialog";
import Legend from "./Legend";

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
    paddingLeft: "5px",
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
    <Stack
      sx={{
        border: `1px solid ${grey[300]}`,
        overflow: "hidden",
        maxWidth: "600px",
      }}
    >
      <Title title="신호기 목록">
        <Stack sx={{ flexDirection: "row", gap: "5px" }}>
          <Legend />
          <IconButton color="primary" onClick={handleClickRefresh}>
            <Refresh />
          </IconButton>
        </Stack>
      </Title>
      <Stack
        sx={{
          margin: "10px",
          border: `1px solid ${grey[200]}`,
        }}
      >
        {/* Header */}
        <Stack sx={TableHeaderStyle}>
          <Stack sx={{ width: "30px", maxWidth: "30px" }}>id</Stack>
          <Stack sx={{ width: "220px", maxWidth: "220px" }}>주소</Stack>
          <Stack sx={{ width: "40px", maxWidth: "40px" }}></Stack>
          <Stack sx={{ width: "40px", maxWidth: "40px" }}></Stack>
          <Stack sx={{ width: "40px", maxWidth: "40px" }}></Stack>
          <Stack sx={{ width: "180px", maxWidth: "180px" }}>수정일</Stack>
          <Stack>상태</Stack>
        </Stack>
        {/* Body */}
        <Stack
          sx={{
            backgroundColor: grey[300],
          }}
        >
          {sensorGroups?.map((group) => {
            console.log(group);
            return (
              <Stack key={group.sensorGroupId}>
                <Stack
                  sx={{
                    ...TableRowStyle,
                    "&:hover": {
                      backgroundColor: "none",
                    },
                  }}
                >
                  <Stack sx={{ width: "30px", maxWidth: "30px" }}>1</Stack>
                  <Stack sx={{ width: "220px", maxWidth: "220px" }}>
                    {group.sensorGroupId}
                  </Stack>
                  <Stack>{`(SSID) ${group.ssid}`}</Stack>
                </Stack>
                {group.sensors.map((sensor, idx) => {
                  const selected = sensor.sensorId === selectedSensor?.sensorId;
                  return (
                    <Stack
                      spacing={1}
                      key={sensor.sensorId}
                      sx={{ ...TableRowStyle, marginLeft: "15px" }}
                      onClick={() => handleClickSensor(sensor)}
                      selected={selected}
                    >
                      <Stack sx={{ width: "30px", maxWidth: "30px" }}>
                        {/* TODO: order 정보 추가하기 */}
                        1-{sensor.groupPositionNumber}
                      </Stack>
                      <Stack
                        sx={{
                          width: "220px",
                          maxWidth: "220px",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        {!sensor.groupPositionNumber && (
                          <Star sx={{ width: "15px", color: grey[700] }} />
                        )}
                        {"주소는 내가 만들어"}
                      </Stack>
                      <Stack sx={{ width: "40px", maxWidth: "40px" }}>
                        <Circle color="#91ff35">{sensor.buttonCount}</Circle>
                      </Stack>
                      <Stack sx={{ width: "40px", maxWidth: "40px" }}>
                        <Circle color="#33eaff">
                          {sensor.positionGuideCount}
                        </Circle>
                      </Stack>
                      <Stack sx={{ width: "40px", maxWidth: "40px" }}>
                        <Circle color="#ffee33">
                          {sensor.signalGuideCount}
                        </Circle>
                      </Stack>
                      <Stack sx={{ width: "180px", maxWidth: "180px" }}>
                        {dayjs(sensor.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
                      </Stack>
                      <Stack sx={{ width: "fit-content" }}>
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
                })}
              </Stack>
            );
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

const Circle = ({ color, children }) => {
  return (
    <Stack
      sx={{
        width: "25px",
        height: "25px",
        borderRadius: "100%",
        backgroundColor: `${color}`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </Stack>
  );
};

export default SensorList;
