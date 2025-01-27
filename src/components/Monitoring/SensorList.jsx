import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import Title from "../Title";
import { TableRowStyle } from "../Sensors/SensorList";
import { Refresh } from "@mui/icons-material";

const SensorList = ({ sensors, setSelectedSensor, selectedSensor }) => {
  const handleClickSensor = (sensor) => {
    setSelectedSensor(sensor);
  };

  const handleClickRefresh = () => {
    console.log("refresh");
  };

  return (
    <Stack sx={{ border: `1px solid ${grey[200]}`, overflow: "hidden" }}>
      <Title title="신호기 목록">
        <IconButton color="primary" onClick={handleClickRefresh}>
          <Refresh />
        </IconButton>
      </Title>
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
            {sensors.map((sensor) => {
              const selected = sensor.sensorId === selectedSensor?.sensorId;
              return (
                <TableRow
                  key={sensor.sensorId}
                  sx={TableRowStyle}
                  onClick={() => handleClickSensor(sensor)}
                  selected={selected}
                >
                  <TableCell>{sensor.sensorId}</TableCell>
                  <TableCell>{sensor.address}</TableCell>
                  <TableCell>{sensor.buttonClickCount}</TableCell>
                  <TableCell>{sensor.locationGuideCount}</TableCell>
                  <TableCell>{sensor.signalGuideCount}</TableCell>
                  <TableCell>
                    {new Date(sensor.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>{sensor.status}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Stack>
    </Stack>
  );
};

export default SensorList;
