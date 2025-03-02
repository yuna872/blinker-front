import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { FAULTS } from "constants";
import { useSelector } from "react-redux";

const FaultInfoTabPanel = () => {
  const faultInformation = useSelector(
    (state) => state.selectedSensor?.faultInformation
  );

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
        {Object.entries(faultInformation).map(([key, value]) => {
          return (
            <TableRow key={key}>
              <TableCell>{FAULTS[key]}</TableCell>
              <TableCell>{value ? "오류" : "정상"}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default FaultInfoTabPanel;
