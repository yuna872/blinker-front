import { TextField } from "@components/TextField";
import Title from "@components/Title";
import { Stack, Typography } from "@mui/material";
import { palette } from "@styles/palette";
import dayjs from "dayjs";
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
          backgroundColor: palette.grey[50],
          borderBottom: `1px solid ${palette.grey[100]}`,
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
          <Typography sx={{ width: "40px" }}>ID</Typography>
          <Typography>{selectedSensor?.sensorGroupId}</Typography>
        </Stack>
        <Stack>
          <Typography sx={{ width: "40px" }}>LT</Typography>
          <Typography>
            {selectedSensor?.updatedAt
              ? dayjs(selectedSensor?.updatedAt).format("YYYY-MM-DD HH:mm:ss")
              : ""}
          </Typography>
        </Stack>
        <Stack>
          <Typography sx={{ width: "40px" }}>주소</Typography>
          <TextField
            fullWidth
            slotProps={{
              htmlInput: {
                readOnly: true,
                style: { fontSize: "14px" },
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
