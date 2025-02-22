import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Refresh, Traffic } from "@mui/icons-material";
import dayjs from "dayjs";
import Title from "@components/Title";
import {
  TableHeaderStyle,
  TableRowStyle,
} from "@components/Sensors/SensorList";
import { theme } from "@styles/theme";
import { useState } from "react";
import SensorDetailsDialog from "./SensorDetailsDialog";

const SensorList = ({ sensors, setSelectedSensor, selectedSensor }) => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const handleOpenDetailsDialog = () => {
    setOpenDetailsDialog(true);
  };

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
  };

  const handleClickSensor = (sensor) => {
    setSelectedSensor(sensor);
  };

  const handleClickRefresh = () => {
    console.log("refresh");
  };

  return (
    <Stack sx={{ border: `1px solid ${grey[200]}`, overflow: "hidden" }}>
      <Title title="신호기 목록">
        <IconButton color="primary" onClick={handleClickRefresh}>
          <Refresh />
        </IconButton>
      </Title>
      <Stack sx={{ margin: "10px", flex: "1", overflowY: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow
              sx={TableHeaderStyle}
            >
              <TableCell>ID</TableCell>
              <TableCell>주소</TableCell>
              <TableCell>버튼</TableCell>
              <TableCell>위치안내</TableCell>
              <TableCell>신호안내</TableCell>
              <TableCell>생성일</TableCell>
              <TableCell>상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sensors.map((sensor) => {
              const selected = sensor.sensorId === selectedSensor?.sensorId;
              return (
                <TableRow
                  key={sensor.sensorId}
                  sx={TableRowStyle}
                  onClick={() => handleClickSensor(sensor)}
                  selected={selected}
                >
                  <TableCell>{sensor.sensorId}</TableCell>
                  <TableCell>{sensor.address}</TableCell>
                  <TableCell>{sensor.buttonClickCount}</TableCell>
                  <TableCell>{sensor.locationGuideCount}</TableCell>
                  <TableCell>{sensor.signalGuideCount}</TableCell>
                  <TableCell>
                    {dayjs(sensor.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                  </TableCell>
                  <TableCell>
                    <Traffic
                      sx={{
                        color: `${theme.palette.status[sensor.status]}`,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDetailsDialog();
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Stack>
      <SensorDetailsDialog
        open={openDetailsDialog}
        handleClose={handleCloseDetailsDialog}
      />
    </Stack>
  );
};

export default SensorList;
