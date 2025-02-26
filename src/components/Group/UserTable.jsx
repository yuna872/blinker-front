import { USERTABLE_WIDTH } from "@components/AdminMonitoring/UserTable";
import {
  TableHeaderStyle,
  TableRowStyle,
} from "@components/Sensors/SensorList";
import Title from "@components/Title";
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { setSelectedUser } from "@store/selectedUserSlice";
import { useDispatch, useSelector } from "react-redux";

const UserTable = ({
  handleOpenAlertDialog,
  handleOpenCreateUserDialog,
  users,
}) => {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.selectedUser);

  const handleClickUser = (user) => {
    dispatch(setSelectedUser(user));
  };

  return (
    <Stack
      sx={{
        flexDirection: "column",
        justifyContent: "space-between",
        borderRight: `1px solid ${grey[200]}`,
        width: `${USERTABLE_WIDTH}px`,
      }}
    >
      <Stack
        sx={{
          gap: "10px",
          zIndex: "3",
          backgroundColor: "white",
          maxWidth: `${USERTABLE_WIDTH}px`,
          width: `${USERTABLE_WIDTH}px`,
          flex: "1",
          overflow: "hidden",
        }}
      >
        <Title title="사용자 목록" />
        <Stack
          sx={{
            padding: "0 10px",
            overflowY: "auto",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={TableHeaderStyle}>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => {
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
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: "10px",
          padding: "10px",
          borderTop: `1px solid ${grey[100]}`,
        }}
      >
        <Button variant="contained" onClick={handleOpenCreateUserDialog}>
          유저 생성
        </Button>
        <Button
          variant="outlined"
          onClick={handleOpenAlertDialog}
          disabled={!selectedUser}
        >
          유저 삭제
        </Button>
      </Stack>
    </Stack>
  );
};

export default UserTable;
