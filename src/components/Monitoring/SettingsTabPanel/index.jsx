import { Button, Stack } from "@mui/material";
import GeneralSettingsForm from "./GeneralSettingsForm";
import SensorSettingsForm from "./\bSensorSettingsForm";
import SoundSettingsForm from "./SoundSettingsForm";

const SettingsTabPanel = () => {
  return (
    <Stack sx={{ paddingBottom: "30px", gap: "20px" }}>
      <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
        <GeneralSettingsForm />
        <SensorSettingsForm />
        <SoundSettingsForm />
      </Stack>
      <Stack
        sx={{ flexDirection: "row", justifyContent: "center", gap: "20px" }}
      >
        <Button variant="contained">G 명령</Button>
        <Button variant="contained">설정 저장하기</Button>
      </Stack>
    </Stack>
  );
};

export default SettingsTabPanel;
