import { Button, Stack, Typography } from "@mui/material";
import SignalSettingsForm from "@components/Settings/SignalSettingsForm";
import SSIDSettingsForm from "@components/Settings/SSIDSettingsForm";
import DefaultSettings from "@components/Settings/DefaultSettings";
import { grey } from "@mui/material/colors";
import Title from "@components/Title";
import { TextField } from "@components/TextField";
import { useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { DEVICE_SETTINGS } from "constants";
import { useEffect } from "react";

const SensorDetails = () => {
  const selectedSensor = useSelector((state) => state.selectedSensor);

  const methods = useForm({
    defaultValues: {
      deviceNumber: "",
      deviceId: "",
      positionSignalStrength: "",
      positionSignalThreshold: "",
      communicationSignalStrength: "",
      communicationSignalThreshold: "",
      wireless235Strength: "",
      femaleMute1: "",
      femaleMute2: "",
      maleMute1: "",
      maleMute2: "",
      birdVolume: "",
      cricketVolume: "",
      dingdongVolume: "",
      femaleVolume: "",
      minuetVolume: "",
      maleVolume: "",
      systemVolume: "",
      communicationInterval: "",
      swVersion: "",
      hwVersion: "",
      groupNumber: "",
      signalsInGroup: "",
      groupPositionNumber: "",
      dataType: "",
      sequenceNumber: "",
      buttonCount: "",
      signalGuideCount: "",
      positionGuideCount: "",
      deviceSettings: Object.fromEntries(
        DEVICE_SETTINGS.map((key) => [key, ""])
      ),
    },
  });

  useEffect(() => {
    if (selectedSensor) {
      methods.reset({
        deviceNumber: selectedSensor?.deviceNumber ?? "",
        deviceId: selectedSensor?.deviceId ?? "",
        positionSignalStrength: selectedSensor?.positionSignalStrength ?? "",
        positionSignalThreshold: selectedSensor?.positionSignalThreshold ?? "",
        communicationSignalStrength:
          selectedSensor?.communicationSignalStrength ?? "",
        communicationSignalThreshold:
          selectedSensor?.communicationSignalThreshold ?? "",
        wireless235Strength: selectedSensor?.wireless235Strength ?? "",
        femaleMute1: selectedSensor?.femaleMute1 ?? "",
        femaleMute2: selectedSensor?.femaleMute2 ?? "",
        maleMute1: selectedSensor?.maleMute1 ?? "",
        maleMute2: selectedSensor?.maleMute2 ?? "",
        birdVolume: selectedSensor?.birdVolume ?? "",
        cricketVolume: selectedSensor?.cricketVolume ?? "",
        dingdongVolume: selectedSensor?.dingdongVolume ?? "",
        femaleVolume: selectedSensor?.femaleVolume ?? "",
        minuetVolume: selectedSensor?.minuetVolume ?? "",
        maleVolume: selectedSensor?.maleVolume ?? "",
        systemVolume: selectedSensor?.systemVolume ?? "",
        communicationInterval: selectedSensor?.communicationInterval ?? "",
        swVersion: selectedSensor?.swVersion ?? "",
        hwVersion: selectedSensor?.hwVersion ?? "",
        groupNumber: selectedSensor?.groupNumber ?? "",
        signalsInGroup: selectedSensor?.signalsInGroup ?? "",
        groupPositionNumber: selectedSensor?.groupPositionNumber ?? "",
        dataType: selectedSensor?.dataType ?? "",
        sequenceNumber: selectedSensor?.sequenceNumber ?? "",
        buttonCount: selectedSensor?.buttonCount,
        signalGuideCount: selectedSensor?.signalGuideCount,
        positionGuideCount: selectedSensor?.positionGuideCount,
        deviceSettings: Object.fromEntries(
          DEVICE_SETTINGS.map((key) => [
            key,
            selectedSensor?.deviceSettings?.[key] ?? "",
          ])
        ),
      });
    }
  }, [selectedSensor]);

  const onSubmit = (formData) => {
    console.log(formData);
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
            {selectedSensor && selectedSensor?.groupPositionNumber === 0 && (
              <SSIDSettingsForm />
            )}
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
