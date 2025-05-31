import { useRefreshSensorGroup } from "@apis/sensor/useRefreshSensorGroup";
import SensorDetailsDialog from "@components/DetailsDialog";
import Title from "@components/Title";
import { useDialog } from "@hooks/useDialog";
import { Cached, Star, Traffic } from "@mui/icons-material";
import {
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { setMapPosition } from "@store/mapPositionSlice";
import { setSelectedSensorState } from "@store/selectedSensorSlice";
import { palette } from "@styles/palette";
import { theme } from "@styles/theme";
import { showToast } from "@utils/toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TableHeaderStyle = {
  backgroundColor: palette.grey[50],
  fontWeight: 600,
  whiteSpace: "nowrap",
  flexDirection: "row",
  padding: "16px",
  borderBottom: `1px solid ${palette.grey[100]}`,
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
  borderBottom: `1px solid ${palette.grey[50]}`,
  backgroundColor: "white",
  "& > .MuiStack-root": {
    marginTop: 0,
    fontSize: "14px",
  },
};

const SensorList = ({ onlyFaulty, setOnlyFaulty, sensorGroups }) => {
  const dispatch = useDispatch();
  const sensorRefs = useRef({});

  const { openDialog } = useDialog();
  const selectedSensor = useSelector((state) => state.selectedSensor);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const handleOpenDetailsDialog = () => {
    setOpenDetailsDialog(true);
  };

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
  };

  const handleChangeOnlyFaulty = (_, newOption) => {
    setOnlyFaulty(newOption);
    dispatch(setSelectedSensorState(null));
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
    setOnlyFaulty(false);
  };

  const { mutateAsync: refreshSensorGroup } = useRefreshSensorGroup();
  const handleClickRefreshSensorGroup = (id) => {
    openDialog({
      title: "센서 그룹 초기화",
      description: `수행 시 센서 목록을 초기화 하며 기존 목록은 복구되지 않습니다.`,
      variant: "alert",
      primaryAction: {
        name: "확인",
        onClick: () => {
          refreshSensorGroup(id).then((res) => {
            showToast.success(
              "초기화 되었습니다. 반영되기까지는 시간이 소요될 수 있습니다."
            );
          });
        },
      },
      secondaryAction: {
        name: "취소",
        onClick: () => {},
      },
    });
  };

  useEffect(() => {
    if (selectedSensor && sensorRefs.current[selectedSensor.sensorId]) {
      sensorRefs.current[selectedSensor.sensorId].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedSensor]);

  return (
    <Stack sx={{ height: "100%" }}>
      <Title title="센서 목록" />
      <ToggleButtonGroup
        value={onlyFaulty}
        onChange={handleChangeOnlyFaulty}
        exclusive
        color="primary"
        sx={{
          margin: "10px",
          "& > button": {
            flex: "1",
          },
        }}
      >
        <ToggleButton value={false} size="small">
          전체
        </ToggleButton>
        <ToggleButton value={true} size="small">
          장애
        </ToggleButton>
      </ToggleButtonGroup>
      <Stack
        sx={{
          margin: "5px 10px 0 10px",
          border: `1px solid ${palette.grey[100]}`,
          height: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Stack
          sx={{
            position: "absolute",
            height: "100%",
            overflow: "auto",
            width: "100%",
          }}
        >
          {/* Header */}
          <Stack sx={TableHeaderStyle}>
            <Stack sx={{ width: "40px", maxWidth: "40px" }}>ID</Stack>
            <Stack sx={{ width: "280px", maxWidth: "280px" }}>주소</Stack>
            <Stack>상태</Stack>
          </Stack>
          {/* Body */}
          {sensorGroups && (
            <Stack
              sx={{
                height: "100%",
              }}
            >
              {sensorGroups?.map((group) => {
                return (
                  <Stack
                    key={group.sensorGroupId}
                    sx={{ backgroundColor: palette.grey[200] }}
                  >
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
                      <Stack sx={{ width: "210px", maxWidth: "210px" }}>
                        {group.sensorGroupId}
                      </Stack>
                      <Stack
                        flex={1}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        {`(SSID) ${group.ssid ?? "-"}`}
                        <IconButton
                          onClick={() =>
                            handleClickRefreshSensorGroup(group.sensorGroupId)
                          }
                        >
                          <Cached />
                        </IconButton>
                      </Stack>
                    </Stack>
                    {group.sensors.map((sensor) => {
                      const selected =
                        sensor.sensorId === selectedSensor?.sensorId;
                      return (
                        <Stack
                          spacing={1}
                          key={sensor.sensorId}
                          ref={(el) => {
                            if (el) sensorRefs.current[sensor.sensorId] = el;
                          }}
                          sx={{
                            ...TableRowStyle,
                            marginLeft: "15px",
                            backgroundColor: selected
                              ? theme.palette.action.selected
                              : "white",
                            flexDirection: "row",
                          }}
                          onClick={() => handleClickSensor(sensor)}
                        >
                          <Stack sx={{ width: "40px", maxWidth: "40px" }}>
                            {group.order}-{sensor.groupPositionNumber}
                          </Stack>
                          <Stack
                            sx={{
                              width: "280px",
                              maxWidth: "280px",
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
          )}
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

export default SensorList;
