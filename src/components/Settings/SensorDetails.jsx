import { Button, Stack, Typography } from "@mui/material";
import SignalSettingsForm from "@components/Settings/SignalSettingsForm";
import DefaultSettings from "@components/Settings/DefaultSettings";
import { grey } from "@mui/material/colors";
import Title from "@components/Title";
import { TextField } from "@components/TextField";
import { useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { DEVICE_SETTINGS } from "constants";
import { useEffect } from "react";
import { usePutSensor } from "@apis/sensor/usePutSensor";
import { showToast } from "@utils/toast";

const SensorDetails = () => {
  const selectedSensor = useSelector((state) => state.selectedSensor);

  const methods = useForm({
    defaultValues: {
      deviceNumber: "",
      deviceId: 0,
      positionSignalStrength: 0,
      positionSignalThreshold: 0,
      communicationSignalStrength: 0,
      communicationSignalThreshold: 0,
      wireless235Strength: 0,
      femaleMute1: 0,
      femaleMute2: 0,
      maleMute1: 0,
      maleMute2: 0,
      birdVolume: 0,
      cricketVolume: 0,
      dingdongVolume: 0,
      femaleVolume: 0,
      minuetVolume: 0,
      maleVolume: 0,
      systemVolume: 0,
      communicationInterval: 0,
      swVersion: 0,
      hwVersion: 0,
      groupKey: "",
      sensorCount: 0,
      groupPositionNumber: 0,
      deviceSettings: Object.fromEntries(
        DEVICE_SETTINGS.map((key) => [key, null])
      ),
    },
  });

  useEffect(() => {
    if (selectedSensor) {
      methods.reset({
        deviceNumber: selectedSensor?.deviceNumber,
        deviceId: selectedSensor?.deviceId,
        positionSignalStrength: selectedSensor?.positionSignalStrength,
        positionSignalThreshold: selectedSensor?.positionSignalThreshold,
        communicationSignalStrength:
          selectedSensor?.communicationSignalStrength,
        communicationSignalThreshold:
          selectedSensor?.communicationSignalThreshold,
        wireless235Strength: selectedSensor?.wireless235Strength,
        femaleMute1: selectedSensor?.femaleMute1,
        femaleMute2: selectedSensor?.femaleMute2,
        maleMute1: selectedSensor?.maleMute1,
        maleMute2: selectedSensor?.maleMute2,
        birdVolume: selectedSensor?.birdVolume,
        cricketVolume: selectedSensor?.cricketVolume,
        dingdongVolume: selectedSensor?.dingdongVolume,
        femaleVolume: selectedSensor?.femaleVolume,
        minuetVolume: selectedSensor?.minuetVolume,
        maleVolume: selectedSensor?.maleVolume,
        systemVolume: selectedSensor?.systemVolume,
        communicationInterval: selectedSensor?.communicationInterval,
        swVersion: selectedSensor?.swVersion,
        hwVersion: selectedSensor?.hwVersion,
        groupKey: selectedSensor?.groupKey,
        sensorCount: selectedSensor?.sensorCount,
        groupPositionNumber: selectedSensor?.groupPositionNumber,
        deviceSettings: Object.fromEntries(
          DEVICE_SETTINGS.map((key) => [
            key,
            selectedSensor?.deviceSettings?.[key],
          ])
        ),
      });
    }
  }, [selectedSensor, methods]);

  const { mutateAsync: putSensor } = usePutSensor();
  const onSubmit = async (formData) => {
    if (selectedSensor) {
      const { sensorGroupId } = selectedSensor;
      try {
        await putSensor({ sensorGroupId, formData }).then((data) => {
          if (data.code === "SUCCESS") {
            showToast.success(
              "설정이 완료되었습니다. 반영되기까지는 시간이 소요될 수 있습니다."
            );
          }
        });
      } catch (error) {
        showToast.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <Stack
        component="form"
        onSubmit={methods.handleSubmit(onSubmit)}
        sx={{ flex: "1" }}
      >
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
            {/* {selectedSensor && selectedSensor?.groupPositionNumber === 0 && (
              <SSIDSettingsForm />
            )} */}
            {/* 신호기 설정 */}
            <SignalSettingsForm />
            {/* 기본 설정 */}
            <DefaultSettings />
          </Stack>
        </Stack>
        <Stack sx={{ backgroundColor: "white", padding: "15px" }}>
          <Button variant="outlined" type="submit" disabled={!selectedSensor}>
            저장
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default SensorDetails;
