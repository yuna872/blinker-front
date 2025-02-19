import {
  TableHeaderStyle,
  TableRowStyle,
} from "@components/Sensors/SensorList";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { FAULT } from "constants";

const FaultInfoTabPanel = () => {
  const data = {
    "Front Cover Open": true,
    "235.3MHz Receiver Fault": false,
    " 358.5MHz Receiver Fault": false,
    "User Button Fault": true,
    "Speaker Fault": true,
    "Signal Light Residual Fault": true,
  };

  return (
    <Table>
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
          <TableCell>항목</TableCell>
          <TableCell>장애유무</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(data).map(([key, value]) => {
          return (
            <TableRow key={key}>
              <TableCell>{FAULT[key]}</TableCell>
              <TableCell>{value ? "오류" : "정상"}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default FaultInfoTabPanel;
