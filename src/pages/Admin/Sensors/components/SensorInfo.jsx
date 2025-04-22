import { TextField } from "@components/TextField";
import Title from "@components/Title";
import { Stack, Typography } from "@mui/material";
import { palette } from "@styles/palette";
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
          backgroundColor: palette.grey[100],
          borderBottom: `1px solid ${palette.grey[200]}`,
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
