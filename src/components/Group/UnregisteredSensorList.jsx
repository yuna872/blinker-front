import { useGetUnregisteredSensorGroups } from "@apis/sensor/useGetUnregisteredSensorGroups.";
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
import { grey } from "@mui/material/colors";
import { resetSelectedSensor } from "@store/selectedSensorSlice";
import { useDispatch } from "react-redux";

const UnregisteredSensorList = ({
  unregisteredSensor,
  setUnregisteredSensor,
}) => {
  const dispatch = useDispatch();
  const { data: sensors } = useGetUnregisteredSensorGroups();

  const handleClickUnregisteredSenor = (sensor) => {
    setUnregisteredSensor(sensor);
    dispatch(resetSelectedSensor());
  };

  return (
    <Stack
      sx={{
        borderLeft: `1px solid ${grey[200]}`,
        overflow: "hidden",
        flex: "1",
      }}
    >
      <Title title="미등록 센서 목록" />
      <Stack
        sx={{
          padding: "10px",
          flex: "1",
          overflowY: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={TableHeaderStyle}>
              <TableCell sx={{ width: "230px", maxWidth: "230px" }}>
                ID
              </TableCell>
              <TableCell>주소</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sensors?.map((sensor) => {
              const selected =
                unregisteredSensor?.sensorGroupId === sensor.sensorGroupId;
              return (
                <TableRow
                  sx={{ ...TableRowStyle }}
                  key={sensor.sensorGroupId}
                  onClick={() => handleClickUnregisteredSenor(sensor)}
                  selected={selected}
                >
                  <TableCell sx={{ width: "230px", maxWidth: "230px" }}>
                    {sensor.sensorGroupId}
                  </TableCell>
                  <TableCell>{sensor?.address}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Stack>
    </Stack>
  );
};

export default UnregisteredSensorList;
