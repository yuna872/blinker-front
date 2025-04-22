import {
  TableHeaderStyle,
  TableRowStyle,
} from "@pages/Admin/Sensors/components/SensorList";
import Title from "@components/Title";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { setSelectedSensorState } from "@store/selectedSensorSlice";
import { setSelectedUser } from "@store/selectedUserSlice";
import { palette } from "@styles/palette";
import { useDispatch, useSelector } from "react-redux";

export const USERTABLE_WIDTH = 300;

const UserTable = ({ users }) => {
  const selectedUser = useSelector((state) => state.selectedUser);
  const dispatch = useDispatch();

  const handleClickUser = (user) => {
    dispatch(setSelectedUser(user));
    dispatch(setSelectedSensorState(null));
  };

  return (
    <Stack
      sx={{
        maxWidth: `${USERTABLE_WIDTH}px`,
        width: `${USERTABLE_WIDTH}px`,
        borderRight: `1px solid ${palette.grey[50]}`,
        overflow: "hidden",
      }}
    >
      <Title title="사용자 목록" />
      <Stack
        sx={{
          padding: "10px",
          overflow: "auto",
        }}
      >
        <Table>
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
  );
};

export default UserTable;
