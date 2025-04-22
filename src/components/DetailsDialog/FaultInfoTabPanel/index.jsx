import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { FAULTS } from "constants";
import { useSelector } from "react-redux";

const FaultInfoTabPanel = () => {
  const faultInformation = useSelector(
    (state) => state.selectedSensor?.faultInformation
  );

  return (
    <Table>
      <TableHead>
        <TableRow>
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
