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
import { dummySignalLights } from "../../pages/Monitoring/dummy";
import { useState } from "react";
import { TableHeaderStyle, TableRowStyle } from "../Sensors/SensorList";

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
        <ToggleButton value="ALL" size="small">
          전체
        </ToggleButton>
        <ToggleButton value="FAULT" size="small">
          장애
        </ToggleButton>
      </ToggleButtonGroup>
      <Stack sx={{ padding: "10px" }}>
        <Table>
          <TableHead>
            <TableRow sx={TableHeaderStyle}>
              <TableCell>ID</TableCell>
              <TableCell>위치</TableCell>
              <TableCell>상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummySignalLights.map((item) => {
              return (
                <TableRow sx={TableRowStyle} key={item.sensorId}>
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
    </Stack>
  );
};

export default SensorList;
