import { theme } from '@styles/theme';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { palette } from '@styles/palette';

export const fieldStyle = {
  flexDirection: 'row',
  gap: '10px',
  alignItems: 'center',
  padding: '0 15px',
};

export const labelStyle = {
  minWidth: '120px',
  fontSize: '14px',
};

const SensorSettingsForm = () => {
  const { register } = useFormContext();
  const selectedSensor = useSelector((state) => state.selectedSensor);

  return (
    <Stack
      sx={{ border: `1px solid ${palette.grey[300]}`, height: 'fit-content' }}
    >
      <FormTitle title='신호기 설정' />
      <Stack
        sx={{
          '& .MuiStack-root': {
            padding: '5px 10px',
            '&:nth-of-type(odd)': {
              backgroundColor: theme.palette.action.hover,
            },
          },
        }}
      >
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>장비번호</Typography>
          <TextField {...register('deviceNumber')} disabled />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>장비 ID</Typography>
          <TextField {...register('deviceId')} />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>위치무선세기 기준</Typography>
          <TextField {...register('positionSignalThreshold')} />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>위치무선세기</Typography>
          <TextField {...register('positionSignalStrength')} />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>신호무선세기 기준</Typography>
          <TextField {...register('communicationSignalThreshold')} />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>신호무선세기</Typography>
          <TextField {...register('communicationSignalStrength')} />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>서버타임</Typography>
          <TextField disabled value={selectedSensor?.serverTime ?? 0} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SensorSettingsForm;
