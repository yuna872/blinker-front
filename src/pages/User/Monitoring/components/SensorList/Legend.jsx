import { Box, Stack, Typography } from "@mui/material";
const Legend = () => {
  return (
    <Stack
      sx={{
        padding: "10px",
        gap: "10px",
        borderRadius: "5px",
      }}
    >
      <Stack sx={{ gap: "7px", flexDirection: "row" }}>
        {[
          { label: "버튼 횟수", color: "#91ff35" },
          { label: "위치안내 횟수", color: "#33eaff" },
          { label: "신호안내 횟수", color: "#ffee33" },
        ].map((item) => {
          return (
            <Stack
              sx={{
                gap: "1px",
                alignItems: "center",
                justifyContent: "center",
              }}
              key={item.label}
            >
              <Typography sx={{ fontSize: "10px" }}>{item.label}</Typography>
              <Box
                sx={{
                  display: "inline-block",
                  width: "15px",
                  height: "15px",
                  borderRadius: "100%",
                  backgroundColor: `${item.color}`,
                }}
              />
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default Legend;
