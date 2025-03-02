import FormTitle from "@components/FormTitle";
import NumberTextField from "@components/NumberTextfield";
import { TextField } from "@components/TextField";
import { Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

export const fieldStyle = {
  flexDirection: "row",
  gap: "10px",
  alignItems: "center",
  padding: "0 15px",
};

export const labelStyle = {
  minWidth: "120px",
  width: "120px",
  fontSize: "14px",
};

const SignalSettingsForm = () => {
  const { register, control } = useFormContext();
  const selectedSensor = useSelector((state) => state.selectedSensor);
  return (
    <Stack
      sx={{
        borderTop: `1px solid ${grey[300]}`,
      }}
    >
      <FormTitle title="신호기 설정" />
      <Stack sx={{ gap: "10px" }}>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>장비번호</Typography>
          <TextField fullWidth disabled {...register("deviceNumber")} />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>장비 ID</Typography>
          <NumberTextField name="deviceId" control={control} />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>위치안내신호세기</Typography>

          <NumberTextField name="positionSignalStrength" control={control} />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>신호안내신호세기</Typography>
          <NumberTextField
            name="communicationSignalStrength"
            control={control}
          />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>위치신호세기기준</Typography>
          <NumberTextField name="positionSignalThreshold" control={control} />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>위치무선세기기준</Typography>
          <NumberTextField
            name="communicationSignalThreshold"
            control={control}
          />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>235신호세기</Typography>
          <NumberTextField name="wireless235Strength" control={control} />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>서버타임</Typography>
          <TextField
            fullWidth
            value={selectedSensor?.serverTime || ""}
            disabled
          />
        </Stack>
        {/* 장비설정 */}
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>장비설정</Typography>
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>새소리 음량</Typography>
          <NumberTextField name="birdVolume" control={control} />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>귀뚜라미소리 음량</Typography>
          <NumberTextField name="cricketVolume" control={control} />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>딩동 음량</Typography>
          <NumberTextField name="dingdongVolume" control={control} />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>여자 음량</Typography>
          <NumberTextField name="femaleVolume" control={control} />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>남자 음량</Typography>
          <NumberTextField name="maleVolume" control={control} />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>미뉴에트 음량</Typography>
          <NumberTextField name="minuetVolume" control={control} />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>시스템 음량</Typography>
          <NumberTextField name="systemVolume" control={control} />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>여자묵음시간1 (초)</Typography>
          <NumberTextField name="femaleMute1" control={control} />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>여자묵음시간2 (초)</Typography>
          <NumberTextField name="femaleMute2" control={control} />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>남자묵음시간1 (초)</Typography>
          <NumberTextField name="maleMute1" control={control} />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>남자묵음시간2 (초)</Typography>
          <NumberTextField name="maleMute2" control={control} />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>통신간격(분 단위)</Typography>
          <NumberTextField name="communicationInterval" control={control} />
        </Stack>
        {/* 장애정보 */}
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>장애정보</Typography>
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>SW 버전</Typography>
          <TextField fullWidth disabled value={selectedSensor?.swVersion} />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>HW 버전</Typography>
          <TextField fullWidth disabled value={selectedSensor?.hwVersion} />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>버튼 횟수</Typography>
          <TextField fullWidth disabled value={selectedSensor?.buttonCount} />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>위치안내 횟수</Typography>
          <TextField
            fullWidth
            disabled
            value={selectedSensor?.positionGuideCount}
          />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>신호안내 횟수</Typography>
          <TextField
            fullWidth
            disabled
            value={selectedSensor?.signalGuideCount}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SignalSettingsForm;
