import { useGetSensorLogs } from "@apis/sensor/useGetSensorLogs";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const StatusHistoryTabPanel = () => {
  const sensorId = useSelector((state) => state.selectedSensor?.sensorId);

  const { data: logs } = useGetSensorLogs(sensorId);
  console.log(logs, "logs");

  // const dummy = new Array(20).fill().map((_, idx) => idx);
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
          {logs?.map((log) => {
            console.log(log.faultInformation)
            return (
              <TableRow key={log.sensorLogId}>
                <TableCell>
                  {dayjs(log.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                </TableCell>
                <TableCell>0</TableCell>
                <TableCell>0</TableCell>
                <TableCell>0</TableCell>
                <TableCell>0</TableCell>
                <TableCell>
                  {log.faultInformation["User Button Fault"] ? "오류" : "정상"}
                </TableCell>
                <TableCell>
                  {log.faultInformation["Signal Light Residual Fault"]
                    ? "오류"
                    : "정상"}
                </TableCell>
                <TableCell>
                  {log.faultInformation["235.3MHz Receiver Fault"]
                    ? "오류"
                    : "정상"}
                </TableCell>
                <TableCell>
                  {log.faultInformation["358.5MHz Receiver Fault"]
                    ? "오류"
                    : "정상"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Stack>
  );
};

export default StatusHistoryTabPanel;
