import { Stack, Typography } from "@mui/material";
import { FormTitle } from "./GeneralSettingsForm";
import { grey } from "@mui/material/colors";
import { theme } from "@styles/theme";
import { TextField } from "@components/TextField";
import { useFormContext } from "react-hook-form";

export const fieldStyle = {
  flexDirection: "row",
  gap: "10px",
  alignItems: "center",
  padding: "0 15px",
};

export const labelStyle = {
  minWidth: "120px",
  fontSize: "14px",
};

const SensorSettingsForm = () => {
  const { register } = useFormContext();

  return (
    <Stack sx={{ border: `1px solid ${grey[300]}`, height: "fit-content" }}>
      <FormTitle title="신호기 설정" />
      <Stack
        sx={{
          "& .MuiStack-root": {
            padding: "5px 10px",
            "&:nth-of-type(odd)": {
              backgroundColor: theme.palette.action.hover,
            },
          },
        }}
      >
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>장비번호</Typography>
          <TextField {...register("deviceNumber")} disabled />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>장비 ID</Typography>
          <TextField {...register("deviceId")} />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>위치무선세기 기준</Typography>
          <TextField {...register('positionSignalThreshold')}/>
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>위치무선세기</Typography>
          <TextField {...register('positionSignalStrength')}/>
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>신호무선세기 기준</Typography>
          <TextField {...register('communicationSignalThreshold')}/>
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>신호무선세기</Typography>
          <TextField {...register('communicationSignalStrength')}/>
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>서버타임</Typography>
          <TextField />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SensorSettingsForm;
