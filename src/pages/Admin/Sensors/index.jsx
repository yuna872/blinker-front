import { GNB_HEIGHT } from '@layouts/Header';
import { useState } from 'react';
import { useGetUsers } from '@apis/auth/useGetUsers';
import { useGetUserSensorGroups } from '@apis/sensor/useGetUserSensorGroups';
import { useSelector } from 'react-redux';

const Sensors = () => {
  const [selectedSensor, setSelectedSensor] = useState();
  const selectedUser = useSelector((state) => state.selectedUser);

  const { data: users } = useGetUsers();
  const { data: sensorGroups } = useGetUserSensorGroups(
    selectedUser?.appUserId
  );

  const sensors = sensorGroups?.flatMap((v) => v.sensors);

  return (
    <Stack
      sx={{
        flexDirection: 'row',
        position: 'relative',
        overflow: 'hidden',
        height: `calc(100vh - ${GNB_HEIGHT}px)`,
      }}
    >
      <Stack
        sx={{
          zIndex: '4',
          backgroundColor: 'white',
        }}
      >
        <UserTable users={users} />
      </Stack>
      <SensorDrawer
        sensors={sensors}
        selectedSensor={selectedSensor}
        setSelectedSensor={setSelectedSensor}
      />
      <SensorsKakaoMap sensors={sensors} />
    </Stack>
  );
};

export default Sensors;
