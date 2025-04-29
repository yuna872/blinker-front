import { GNB_HEIGHT } from '@layouts/Header';
import { useGetUsers } from '@apis/auth/useGetUsers';
import { useGetUserSensorGroups } from '@apis/sensor/useGetUserSensorGroups';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const AdminMonitoring = () => {
  const selectedUser = useSelector((state) => state.selectedUser);
  const [onlyFaulty, setOnlyFaulty] = useState(null);

  const { data: users } = useGetUsers();
  const { data: sensorGroups } = useGetUserSensorGroups(
    selectedUser?.appUserId,
    onlyFaulty ?? false
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
        <FailureInfo />
      </Stack>
      <SensorDrawer
        sensorGroups={sensorGroups}
        onlyFaulty={onlyFaulty}
        setOnlyFaulty={setOnlyFaulty}
      />
      <AdminKakaoMap sensors={sensors} />
    </Stack>
  );
};

export default AdminMonitoring;
