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
import { palette } from "@styles/palette";
import { FAULTS } from "constants";
import { useSelector } from "react-redux";

const FaultInfo = () => {
  const selectedSensor = useSelector((state) => state.selectedSensor);

  return (
    <Stack sx={{ borderRight: `1px solid ${palette.grey[50]}` }}>
      <Title title="장애 정보" />
      <Stack sx={{ padding: "10px" }}>
        <Table>
          <TableHead>
            <TableRow sx={TableHeaderStyle}>
              <TableCell>항목</TableCell>
              <TableCell>장애유무</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(FAULTS).map((key) => {
              const faulty = selectedSensor?.faultInformation[key] ?? null;
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
                  <TableCell>
                    {faulty === null ? "" : faulty ? "오류" : "정상"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Stack>
    </Stack>
  );
};

export default FaultInfo;
