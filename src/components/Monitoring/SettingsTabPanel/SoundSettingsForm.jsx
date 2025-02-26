import { TextField } from "@components/TextField";
import { Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { FormTitle } from "./GeneralSettingsForm";
import { theme } from "@styles/theme";
import { fieldStyle, labelStyle } from "./SensorSettingsForm";
import { useFormContext } from "react-hook-form";

const SoundSettingsForm = () => {
  const { register } = useFormContext();

  return (
    <Stack sx={{ border: `1px solid ${grey[300]}` }}>
      <FormTitle title="소리 설정" />
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
          <Typography sx={labelStyle}>새소리 음량</Typography>
          <TextField {...register("birdVolume")} />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>귀뚜라미소리 음량</Typography>
          <TextField {...register("cricketVolume")} />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>멜로디 음량</Typography>
          <TextField />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>여자 음량</Typography>
          <TextField {...register("femaleVolume")}/>
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>남자 음량</Typography>
          <TextField {...register("maleVolume")}/>
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>미뉴에트 음량</Typography>
          <TextField />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>시스템 음량</Typography>
          <TextField {...register("systemVolume")}/>
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>여자묵음시간1(초)</Typography>
          <TextField {...register("femaleMute1")}/>
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>여자묵음시간2(초)</Typography>
          <TextField {...register("femaleMute2")}/>
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>남자묵음시간1(초)</Typography>
          <TextField {...register("maleMute1")}/>
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>남자묵음시간2(초)</Typography>
          <TextField {...register("maleMute2")}/>
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>통신간격(분 단위)</Typography>
          <TextField/>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SoundSettingsForm;
