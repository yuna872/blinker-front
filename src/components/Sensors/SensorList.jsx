import { useGetUserSensorGroups } from "@apis/sensor/useGetUserSensorGroups";
import Title from "@components/Title";
import { Star, Traffic } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import { setMapPosition } from "@store/mapPositionSlice";
import { setSelectedSensorState } from "@store/selectedSensorSlice";
import { theme } from "@styles/theme";
import { useDispatch, useSelector } from "react-redux";

export const TableHeaderStyle = {
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

export const TableRowStyle = {
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
  const selectedSensor = useSelector((state) => state.selectedSensor);
  const selectedUser = useSelector((state) => state.selectedUser);

  const { data: sensorGroups } = useGetUserSensorGroups(
    selectedUser?.appUserId
  );

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

  return (
    <Stack sx={{ flex: "1" }}>
      <Title title="센서 목록" />
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
                    <Stack sx={{ width: "30px", maxWidth: "30px" }}>
                      {group.order}
                    </Stack>
                    <Stack sx={{ width: "210px", maxWidth: "210px" }}>
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
