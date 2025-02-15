import { Box, Stack, Typography } from "@mui/material";
import { theme } from "@styles/theme";

export const STATUS = ['정상', '오류', '미접속'];

const Legend = () => {
  return (
    <Stack
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        padding: "10px",
        gap: "10px",
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        position: "absolute",
        bottom: "30px",
        left: "15px",
        zIndex: 2,
      }}
    >
      <Typography sx={{ fontSize: "14px" }}>범례</Typography>
      <Stack sx={{ gap: "7px" }}>
        {STATUS.map((status) => {
          return (
            <Stack
              sx={{ flexDirection: "row", gap: "5px", alignItems: "center" }}
              key={status}
            >
              <Box
                sx={{
                  display: "inline-block",
                  width: "15px",
                  height: "15px",
                  borderRadius: "100%",
                  backgroundColor: `${theme.palette.status[status]}`,
                }}
              />
              <Typography sx={{ fontSize: "14px" }}>{status}</Typography>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default Legend;
