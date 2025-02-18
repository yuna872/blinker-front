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
            "& > p": {
              fontSize: "14px",
            },
          },
        }}
      >
        <Stack>
          <Typography sx={{ width: "40px" }}>ID</Typography>
          <Typography>0000102140ca63fffe1def20</Typography>
        </Stack>
        <Stack>
          <Typography sx={{ width: "40px" }}>LT</Typography>
          <Typography>2025-02-17T12:37:14+09:00</Typography>
        </Stack>
        <Stack>
          <Typography sx={{ width: "40px" }}>위치</Typography>
          <TextField
            fullWidth
            slotProps={{
              htmlInput: {
                readOnly: true,
                style: { fontSize: "14px" },
              },
            }}
            value="경기도 수원시 권선구"
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SensorInfo;
