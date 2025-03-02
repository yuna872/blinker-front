import { Button, Stack } from "@mui/material";
import GeneralSettingsForm from "./GeneralSettingsForm";
import SensorSettingsForm from "./SensorSettingsForm";
import SoundSettingsForm from "./SoundSettingsForm";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const SettingsTabPanel = () => {
  const selectedSensor = useSelector((state) => state.selectedSensor);
  const methods = useForm({
    defaultValues: selectedSensor,
  });

  const onSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <FormProvider {...methods}>
      <Stack
        component="form"
        onSubmit={methods.handleSubmit(onSubmit)}
        sx={{ paddingBottom: "30px", gap: "20px" }}
      >
        <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
          <GeneralSettingsForm />
          <SensorSettingsForm />
          <SoundSettingsForm />
        </Stack>
        <Stack
          sx={{ flexDirection: "row", justifyContent: "center", gap: "20px" }}
        >
          <Button variant="contained">G 명령</Button>
          <Button type="submit" variant="contained">
            설정 저장하기
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default SettingsTabPanel;
