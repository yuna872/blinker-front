import { IconButton, Stack } from "@mui/material";
import { Refresh, Star, Traffic } from "@mui/icons-material";
import dayjs from "dayjs";
import Title from "@components/Title";
import { theme } from "@styles/theme";
import { useState } from "react";
import Legend from "./Legend";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSensorState } from "@store/selectedSensorSlice";
import { setMapPosition } from "@store/mapPositionSlice";
import { palette } from "@styles/palette";
import SensorDetailsDialog from "@components/DetailsDialog";

const TableHeaderStyle = {
  backgroundColor: palette.grey[50],
  fontWeight: 600,
  whiteSpace: "nowrap",
  flexDirection: "row",
  padding: "16px",
  borderBottom: `1px solid ${palette.grey[200]}`,
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
  borderBottom: `1px solid ${palette.grey[200]}`,
  backgroundColor: "white",
  "& > .MuiStack-root": {
    marginTop: 0,
    fontSize: "14px",
  },
};

const SensorList = ({ sensorGroups, refetch }) => {
  const dispatch = useDispatch();
  const selectedSensor = useSelector((state) => state.selectedSensor);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const handleOpenDetailsDialog = () => {
    setOpenDetailsDialog(true);
  };

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
  };

  const handleClickSensor = (sensor) => {
    if (sensor) {
      dispatch(setSelectedSensorState(sensor));
      dispatch(
        setMapPosition({
          lat: sensor.latitude,
          lng: sensor.longitude,
        })
      );
    }
  };

  const handleClickRefresh = () => {
    refetch();
  };


  return (
    <Stack
      sx={{
        border: `1px solid ${palette.grey[300]}`,
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
          border: `1px solid ${palette.grey[200]}`,
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
            backgroundColor: palette.grey[300],
          }}
        >
          {sensorGroups?.map((group) => {
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
                  <Stack sx={{ width: "30px", maxWidth: "30px" }}>
                    {group.order}
                  </Stack>
                  <Stack sx={{ width: "220px", maxWidth: "220px" }}>
                    {group.sensorGroupId}
                  </Stack>
                  <Stack>{`(SSID) ${group.ssid ?? "-"}`}</Stack>
                </Stack>
                {group.sensors.map((sensor) => {
                  const selected = sensor.sensorId === selectedSensor?.sensorId;
                  return (
                    <Stack
                      spacing={1}
                      key={sensor.sensorId}
                      sx={{
                        ...TableRowStyle,
                        marginLeft: "15px",
                        backgroundColor: selected
                          ? theme.palette.action.selected
                          : "white",
                      }}
                      onClick={() => handleClickSensor(sensor)}
                    >
                      <Stack sx={{ width: "30px", maxWidth: "30px" }}>
                        {group.order}-{sensor.groupPositionNumber}
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
                          <Star
                            sx={{ width: "15px", color: palette.grey[700] }}
                          />
                        )}
                        {sensor.address}
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
                        <Traffic
                          sx={{
                            color: sensor.needUpdate
                              ? theme.palette.status["업데이트 필요"]
                              : `${theme.palette.status[sensor.status]}`,
                          }}
                          onClick={handleOpenDetailsDialog}
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
        sensor={selectedSensor}
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
