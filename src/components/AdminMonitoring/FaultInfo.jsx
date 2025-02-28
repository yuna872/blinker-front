
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
import { FAULTS } from "constants";
import { useSelector } from "react-redux";

const FaultInfo = () => {
  const selectedSensor = useSelector((state) => state.selectedSensor);

  return (
    <Stack sx={{ borderRight: `1px solid ${grey[200]}` }}>
      <Title title="장애 정보" />
      <Stack sx={{ padding: "10px" }}>
        <Table>
          <TableHead>
            <TableRow sx={TableHeaderStyle}>
              <TableCell>항목</TableCell>
              <TableCell>장애유무</TableCell>
            </TableRow>
          </TableHead>
          {selectedSensor?.faultInformation && (
            <TableBody>
              {Object.entries(selectedSensor.faultInformation).map(
                ([key, value]) => {
                  return (
                    <TableRow
                      key={key}
                      sx={{
                        ...TableRowStyle,
                        "& > .MuiTableCell-root": {
                          padding: "8px 16px",
                        },
                      }}
                    >
                      <TableCell>{FAULTS[key]}</TableCell>
                      <TableCell>{value ? "오류" : "정상"}</TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          )}
        </Table>
      </Stack>
    </Stack>
  );
};

export default FaultInfo;
