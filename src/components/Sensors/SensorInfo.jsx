import { TextField } from "@components/TextField";
import Title from "@components/Title";
import { Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useSelector } from "react-redux";

const SensorInfo = () => {
  const selectedSensor = useSelector((state) => state.selectedSensor);

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
            "& > p": {
              fontSize: "14px",
            },
          },
        }}
      >
        <Stack>
          <Typography sx={{ width: "50px" }}>ID</Typography>
          <Typography>{selectedSensor?.sensorGroupId}</Typography>
        </Stack>
        <Stack>
          <Typography sx={{ width: "50px" }}>주소</Typography>
          <TextField
            fullWidth
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            value={selectedSensor ? selectedSensor?.address : ""}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SensorInfo;
