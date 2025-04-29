import { useDeleteUser } from '@apis/auth/useDeleteUser';
import { USERTABLE_WIDTH } from '@pages/Admin/Monitoring/components/UserTable';
import {
  TableHeaderStyle,
  TableRowStyle,
} from '@pages/Admin/Sensors/components/SensorList';
import { useDialog } from '@hooks/useDialog';

import { setSelectedUser } from '@store/selectedUserSlice';
import { palette } from '@styles/palette';
import { showToast } from '@utils/toast';
import { useDispatch, useSelector } from 'react-redux';

const UserTable = ({ handleOpenCreateUserDialog, users }) => {
  const dispatch = useDispatch();
  const { openDialog } = useDialog();
  const selectedUser = useSelector((state) => state.selectedUser);
  const { mutateAsync: deleteUser } = useDeleteUser();

  const handleClickUser = (user) => {
    dispatch(setSelectedUser(user));
  };

  const handleClickDeleteUser = () => {
    openDialog({
      title: '유저 삭제',
      description: `${selectedUser?.userId} 해당 유저를 삭제하면 복구할 수 없습니다. 계속 진행하시겠습니까?`,
      variant: 'alert',
      primaryAction: {
        name: '삭제',
        onClick: async () => {
          try {
            await deleteUser(selectedUser?.appUserId).then((data) => {
              if (data.code === 'SUCCESS') {
                showToast.success('삭제 되었습니다.');
              } else {
                showToast.error(data.message);
              }
            });
          } catch (error) {
            console.error(error);
          }
        },
      },
      secondaryAction: {
        name: '취소',
        onClick: () => {},
      },
    });
  };

  return (
    <Stack
      sx={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRight: `1px solid ${palette.grey[200]}`,
        width: `${USERTABLE_WIDTH}px`,
      }}
    >
      <Stack
        sx={{
          gap: '10px',
          zIndex: '3',
          backgroundColor: 'white',
          maxWidth: `${USERTABLE_WIDTH}px`,
          width: `${USERTABLE_WIDTH}px`,
          flex: '1',
          overflow: 'hidden',
        }}
      >
        <Title title='사용자 목록' />
        <Stack
          sx={{
            padding: '0 10px',
            overflowY: 'auto',
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={TableHeaderStyle}>
                <TableCell>ID</TableCell>
                <TableCell>이름</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user) => {
                const selected = user.appUserId === selectedUser?.appUserId;
                return (
                  <TableRow
                    key={user.appUserId}
                    selected={selected}
                    sx={{
                      ...TableRowStyle,
                    }}
                    onClick={() => handleClickUser(user)}
                  >
                    <TableCell>{user.userId}</TableCell>
                    <TableCell>{user.username}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Stack>
      </Stack>
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          gap: '10px',
          padding: '10px',
          borderTop: `1px solid ${palette.grey[100]}`,
        }}
      >
        <Button variant='contained' onClick={handleOpenCreateUserDialog}>
          유저 생성
        </Button>
        <Button
          variant='outlined'
          onClick={handleClickDeleteUser}
          disabled={!selectedUser}
        >
          유저 삭제
        </Button>
      </Stack>
    </Stack>
  );
};

export default UserTable;
