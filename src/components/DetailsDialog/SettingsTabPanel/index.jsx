import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { DEVICE_SETTINGS } from 'constants';
import { useEffect } from 'react';
import { usePutSensor } from '@apis/sensor/usePutSensor';
import { showToast } from '@utils/toast';

const SettingsTabPanel = () => {
  const selectedSensor = useSelector((state) => state.selectedSensor);

  const methods = useForm({
    defaultValues: {
      deviceNumber: '',
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
      groupKey: '',
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
          if (data.code === 'SUCCESS') {
            showToast.success(
              '설정이 완료되었습니다. 반영되기까지는 시간이 소요될 수 있습니다.'
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
        component='form'
        onSubmit={methods.handleSubmit(onSubmit)}
        sx={{
          gap: '20px',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <Stack
          sx={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            overflow: 'auto',
          }}
        >
          <GeneralSettingsForm />
          <SensorSettingsForm />
          <SoundSettingsForm />
        </Stack>
        <Stack
          sx={{ flexDirection: 'row', justifyContent: 'center', gap: '20px' }}
        >
          <Button type='submit' variant='contained'>
            설정 저장하기
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default SettingsTabPanel;
