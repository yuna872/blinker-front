import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { theme } from "@styles/theme";
import Title from "@components/Title";

export const TableHeaderStyle = {
  "& > .MuiTableCell-root": {
    backgroundColor: grey[50],
    fontWeight: 600,
    padding: "8px 16px",
    whiteSpace: "nowrap",
  },
};

export const TableRowStyle = {
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
};

const SensorList = ({ sensors, setSelectedSensor }) => {
  const handleClickSensor = (v) => {
    setSelectedSensor(v);
  };
  return (
    <Stack>
      <Title title="센서 목록" />
      <Stack sx={{ padding: "10px" }}>
        <Table>
          <TableHead>
            <TableRow sx={TableHeaderStyle}>
              <TableCell>ID</TableCell>
              <TableCell>위치</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sensors.map((item) => {
              return (
                <TableRow
                  sx={TableRowStyle}
                  key={item.sensorId}
                  onClick={() => handleClickSensor(item)}
                >
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
