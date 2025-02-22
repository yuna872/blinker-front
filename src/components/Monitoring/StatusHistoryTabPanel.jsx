import { TableHeaderStyle } from "@components/Sensors/SensorList";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { grey } from "@mui/material/colors";

const StatusHistoryTabPanel = () => {
  const dummy = new Array(20).fill().map((_, idx) => idx);
  return (
    <Stack sx={{ height: "100%", overflow: "auto" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow
            sx={{
              "& > .MuiTableCell-root": {
                backgroundColor: grey[50],
                fontWeight: 600,
                whiteSpace: "nowrap",
              },
            }}
          >
            <TableCell>발생 시각</TableCell>
            <TableCell>버튼 횟수</TableCell>
            <TableCell>위치안내 횟수</TableCell>
            <TableCell>신호안내 횟수</TableCell>
            <TableCell>리모컨 수신</TableCell>
            <TableCell>버튼 작동</TableCell>
            <TableCell>전원 상태</TableCell>
            <TableCell>235 채널 신호</TableCell>
            <TableCell>358 채널 신호</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dummy.map((idx) => {
            return (
              <TableRow key={idx}>
                <TableCell>2025-02-13 09:18:32</TableCell>
                <TableCell>0</TableCell>
                <TableCell>0</TableCell>
                <TableCell>0</TableCell>
                <TableCell>0</TableCell>
                <TableCell>정상</TableCell>
                <TableCell>정상</TableCell>
                <TableCell>정상</TableCell>
                <TableCell>정상</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Stack>
  );
};

export default StatusHistoryTabPanel;
