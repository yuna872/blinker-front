import { GNB_HEIGHT } from '@layouts/Header';
import { useGetUsers } from '@apis/auth/useGetUsers';

const Settings = () => {
  const { data: users } = useGetUsers();

  return (
    <Stack
      sx={{ flexDirection: 'row', height: `calc(100vh - ${GNB_HEIGHT}px)` }}
    >
      <UserTable users={users} />
      <SensorList />
      <SensorDetails />
    </Stack>
  );
};

export default Settings;
