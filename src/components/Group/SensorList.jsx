import {
  TableHeaderStyle,
  TableRowStyle,
} from "@components/Sensors/SensorList";
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
import { dummySignalLights } from "@pages/User/Monitoring/dummy";

const SensorList = () => {
  return (
    <Stack
      sx={{
        borderRight: `1px solid ${grey[200]}`,
        overflow: "hidden",
      }}
    >
      <Title title="센서 목록" />
      <Stack
        sx={{
          padding: "10px",
          flex: "1",
          overflowY: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={TableHeaderStyle}>
              <TableCell>ID</TableCell>
              <TableCell>위치</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummySignalLights.map((item) => {
              return (
                <TableRow sx={TableRowStyle} key={item.sensorId}>
                  {/* TODO: Id 수정 필요 */}
                  <TableCell>00000741702c1ffffe54c0c3</TableCell>
                  <TableCell>{item.address}</TableCell>
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
