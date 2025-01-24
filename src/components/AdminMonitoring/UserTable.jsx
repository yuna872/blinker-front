import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Title from "../Title";
import { grey } from "@mui/material/colors";

const UserTable = () => {
  const users = [
    { id: 0, userId: "admin", userName: "admin" },
    {
      id: 1,
      userId: "test",
      userName: "test",
    },
  ];
  return (
    <Stack sx={{ gap: "10px" }}>
      <Title title="사용자 목록" />
      <Table>
        <TableHead>
          <TableRow
            sx={{
              "& > .MuiTableCell-root": {
                backgroundColor: grey[50],
                fontWeight: 600,
              },
            }}
          >
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => {
            return (
              <TableRow key={user.id}>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.userName}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Stack>
  );
};

export default UserTable;
