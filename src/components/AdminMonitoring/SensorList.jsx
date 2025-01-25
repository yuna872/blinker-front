import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Title from "../Title";
import { grey } from "@mui/material/colors";
import { dummySignalLights } from "../../pages/Monitoring/dummy";
import { useState } from "react";

const SensorList = () => {
  const [filterOption, setFilterOption] = useState("");

  const handleChangeFilterOption = (e, newOption) => {
    setFilterOption(newOption);
    console.log(newOption);
  };

  return (
    <Stack>
      <Title title="센서 목록" />
      <ToggleButtonGroup
        value={filterOption}
        onChange={handleChangeFilterOption}
        exclusive
        color="primary"
        sx={{
          margin: "10px",
          "& > button": {
            flex: "1",
          },
        }}
      >
        <ToggleButton value="ALL">전체</ToggleButton>
        <ToggleButton value="FAULT">장애</ToggleButton>
      </ToggleButtonGroup>
      <Table>
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
            <TableCell>위치</TableCell>
            <TableCell>상태</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dummySignalLights.map((item) => {
            return (
              <TableRow>
                {/* TODO: Id 수정 필요 */}
                <TableCell>00000741702c1ffffe54c0c3</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Stack>
  );
};

export default SensorList;
