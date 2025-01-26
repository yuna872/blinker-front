import { Stack, Typography } from "@mui/material";
import Title from "../Title";
import { TextField } from "../TextField";
import { grey } from "@mui/material/colors";

const SensorInfo = ({ selectedSensor }) => {
  console.log(selectedSensor);
  return (
    <Stack>
      <Title title="센서 정보" />
      <Stack
        sx={{
          padding: "15px",
          gap: "15px",
          backgroundColor: grey[100],
          borderBottom: `1px solid ${grey[200]}`,
          "& > .MuiStack-root": {
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
          },
        }}
      >
        <Stack>
          <Typography sx={{ width: "50px" }}>ID</Typography>
          <Typography>{selectedSensor?.sensorId}</Typography>
        </Stack>
        <Stack>
          <Typography sx={{ width: "50px" }}>위치</Typography>
          <TextField
            fullWidth
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            value={selectedSensor?.address}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SensorInfo;
