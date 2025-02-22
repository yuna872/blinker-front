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
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { FAULT } from "constants";

const FailureInfo = () => {
  const data = {
    "Front Cover Open": true,
    "235.3MHz Receiver Fault": false,
    " 358.5MHz Receiver Fault": false,
    "User Button Fault": true,
    "Speaker Fault": true,
    "Signal Light Residual Fault": true,
  };

/**
 * "faultInformation": {
            "Front Cover Open": false,
            "235.3MHz Receiver Fault": false,
            "358.5MHz Receiver Fault": false,
            "User Button Fault": false,
            "Speaker Fault": false,
            "Signal Light Residual Fault": false
        },
 */

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
          <TableBody>
            {Object.entries(data).map(([key, value]) => {
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
                  <TableCell>{FAULT[key]}</TableCell>
                  <TableCell>{value ? "오류" : "정상"}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Stack>
    </Stack>
  );
};

export default FailureInfo;
