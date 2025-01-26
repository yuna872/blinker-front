import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import Title from "../Title";

const SensorList = ({ sensors }) => {
  return (
    <Stack sx={{ border: `1px solid ${grey[200]}`, overflow: "hidden" }}>
      <Title title="신호기 목록" />
      <Stack sx={{ margin: "10px", flex: "1", overflowY: "auto" }}>
        <Table stickyHeader>
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
              <TableCell>주소</TableCell>
              <TableCell>버튼</TableCell>
              <TableCell>위치안내</TableCell>
              <TableCell>신호안내</TableCell>
              <TableCell>생성일</TableCell>
              <TableCell>상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sensors.map((item) => (
              <TableRow key={item.sensorId} className="item-card">
                <TableCell>{item.sensorId}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.buttonClickCount}</TableCell>
                <TableCell>{item.locationGuideCount}</TableCell>
                <TableCell>{item.signalGuideCount}</TableCell>
                <TableCell>
                  {new Date(item.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Stack>
    </Stack>
  );
};

export default SensorList;
