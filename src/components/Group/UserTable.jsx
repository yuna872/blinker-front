import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Title from "../Title";
import { grey } from "@mui/material/colors";
import { TableHeaderStyle, TableRowStyle } from "../Sensors/SensorList";
import { USERTABLE_WIDTH } from "../AdminMonitoring/UserTable";
import { dummyUsers } from "../../constants";

const UserTable = ({ setSelectedUser, selectedUser, handleOpenDialog }) => {
  const handleClickUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <Stack
      sx={{
        flexDirection: "column",
        justifyContent: "space-between",
        borderRight: `1px solid ${grey[200]}`,
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
              {dummyUsers.map((user) => {
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
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: "10px",
          padding: "10px",
          borderTop: `1px solid ${grey[100]}`,
        }}
      >
        <Button variant="contained">유저 생성</Button>
        <Button variant="outlined" onClick={handleOpenDialog}>
          유저 삭제
        </Button>
      </Stack>
    </Stack>
  );
};

export default UserTable;
