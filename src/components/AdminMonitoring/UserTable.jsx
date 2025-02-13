import { TableHeaderStyle, TableRowStyle } from "@components/Sensors/SensorList";
import Title from "@components/Title";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { grey } from "@mui/material/colors";

export const USERTABLE_WIDTH = 320;

const UserTable = ({ setSelectedUser, selectedUser }) => {
  const handleClickUser = (user) => {
    setSelectedUser(user);
  };

  const users = [
    { id: 0, userId: "admin", userName: "admin" },
    {
      id: 1,
      userId: "test",
      userName: "test",
    },
    {
      id: 2,
      userId: "test",
      userName: "test",
    },
    {
      id: 3,
      userId: "test",
      userName: "test",
    },
    {
      id: 4,
      userId: "test",
      userName: "test",
    },
    {
      id: 5,
      userId: "test",
      userName: "test",
    },
    {
      id: 6,
      userId: "test",
      userName: "test",
    },
  ];
  return (
    <Stack
      sx={{
        gap: "10px",
        zIndex: "3",
        backgroundColor: "white",
        maxWidth: `${USERTABLE_WIDTH}px`,
        width: `${USERTABLE_WIDTH}px`,
        borderRight: `1px solid ${grey[200]}`,
      }}
    >
      <Title title="사용자 목록" />
      <Stack
        sx={{
          padding: "0 10px",
          overflowY: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={TableHeaderStyle}>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              const selected = user.id === selectedUser?.id;
              return (
                <TableRow
                  key={user.id}
                  selected={selected}
                  sx={{
                    ...TableRowStyle,
                  }}
                  onClick={() => handleClickUser(user)}
                >
                  <TableCell>{user.userId}</TableCell>
                  <TableCell>{user.userName}</TableCell>
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
