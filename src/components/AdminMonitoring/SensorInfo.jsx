import { TextField } from "@components/TextField";
import Title from "@components/Title";
import { Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const SensorInfo = () => {
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
          <Typography sx={{ width: "40px" }}>ID</Typography>
          <Typography>더헉</Typography>
        </Stack>
        <Stack>
          <Typography sx={{ width: "40px" }}>LT</Typography>
          <Typography>더헉F</Typography>
        </Stack>
        <Stack>
          <Typography sx={{ width: "40px" }}>위치</Typography>
          <TextField fullWidth />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SensorInfo;
