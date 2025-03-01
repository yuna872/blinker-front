import { Button, Stack, Typography } from "@mui/material";
import SignalSettingsForm from "@components/Settings/SignalSettingsForm";
import SSIDSettingsForm from "@components/Settings/SSIDSettingsForm";
import DefaultSettings from "@components/Settings/DefaultSettings";
import { grey } from "@mui/material/colors";
import Title from "@components/Title";
import { TextField } from "@components/TextField";
import { useSelector } from "react-redux";

const SensorDetails = () => {
  const selectedSensor = useSelector((state) => state.selectedSensor);

  return (
    <Stack sx={{ flex: "1" }}>
      <Title title="센서 상세 정보" />
      <Stack sx={{ overflow: "hidden" }}>
        <Stack
          sx={{
            padding: "15px",
            gap: "15px",
            backgroundColor: grey[100],
            "& > .MuiStack-root": {
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
              "& > p": {
                fontSize: "14px",
              },
            },
          }}
        >
          <Stack>
            <Typography sx={{ width: "50px" }}>ID</Typography>
            <Typography>{selectedSensor?.sensorGroupId}</Typography>
          </Stack>
          <Stack>
            <Typography sx={{ width: "50px" }}>주소</Typography>
            <TextField
              fullWidth
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              value={selectedSensor?.address || ""}
            />
          </Stack>
        </Stack>
        <Stack
          sx={{
            gap: "15px",
            flex: "1",
            overflowY: "auto",
          }}
        >
          {/* SSID 설정 */}
          <SSIDSettingsForm />
          {/* 신호기 설정 */}
          <SignalSettingsForm />
          {/* 기본 설정 */}
          <DefaultSettings />
        </Stack>
      </Stack>
      <Stack sx={{ backgroundColor: "white", padding: "15px" }}>
        <Button variant="outlined">저장</Button>
      </Stack>
    </Stack>
  );
};

export default SensorDetails;
