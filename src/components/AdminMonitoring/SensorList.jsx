import { useGetUserSensorGroups } from "@apis/sensor/useGetUserSensorGroups";
import Title from "@components/Title";
import { Star, Traffic } from "@mui/icons-material";
import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { grey } from "@mui/material/colors";
import { setSelectedSensorState } from "@store/selectedSensorSlice";
import { theme } from "@styles/theme";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

const SensorList = () => {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.selectedUser);
  const selectedSensor = useSelector((state) => state.selectedSensor);
  const { data: sensorGroups } = useGetUserSensorGroups(
    selectedUser?.appUserId
  );

  const [filterOption, setFilterOption] = useState("");

  const handleChangeFilterOption = (e, newOption) => {
    setFilterOption(newOption);
  };

  const handleClickSensor = (sensor) => {
    dispatch(setSelectedSensorState(sensor));
  };

  console.log(sensorGroups, "user sensor");
  console.log(selectedSensor, "selected");

  return (
    <Stack>
      <Title title="센서 목록" />
      <ToggleButtonGroup
        value={filterOption}
        onChange={handleChangeFilterOption}
        exclusive
        color="primary"
        sx={{
          margin: "10px",
          "& > button": {
            flex: "1",
          },
        }}
      >
        <ToggleButton value="ALL" size="small">
          전체
        </ToggleButton>
        <ToggleButton value="FAULT" size="small">
          장애
        </ToggleButton>
      </ToggleButtonGroup>
      <Stack
        sx={{
          margin: "10px",
          border: `1px solid ${grey[200]}`,
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
              backgroundColor: grey[300],
              overflowY: "auto",
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
                    <Stack sx={{ width: "40px", maxWidth: "40px" }}>
                      {group.order}
                    </Stack>
                    <Stack sx={{ width: "220px", maxWidth: "220px" }}>
                      {group.sensorGroupId}
                    </Stack>
                    <Stack>{`(SSID) ${group.ssid}`}</Stack>
                  </Stack>
                  {group.sensors.map((sensor) => {
                    const selected =
                      sensor.sensorId === selectedSensor?.sensorId;
                    return (
                      <Stack
                        spacing={1}
                        key={sensor.sensorId}
                        sx={{
                          ...TableRowStyle,
                          marginLeft: "15px",
                          backgroundColor: selected ? grey[100] : "white",
                          flexDirection: "row",
                        }}
                        onClick={() => handleClickSensor(sensor)}
                      >
                        <Stack sx={{ width: "40px", maxWidth: "40px" }}>
                          {/* TODO: order 정보 추가하기 */}
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
                            <Star sx={{ width: "15px", color: grey[700] }} />
                          )}
                          {sensor.address}
                        </Stack>
                        <Stack sx={{ width: "fit-content" }}>
                          {/* TODO: 상태 정보 반영하기 */}
                          <Traffic
                            sx={{
                              color: `${theme.palette.status[sensor.status]}`,
                            }}
                            onClick={() => {
                              // handleOpenDetailsDialog();
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
        )}
      </Stack>
    </Stack>
  );
};

export default SensorList;
