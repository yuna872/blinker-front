import { CircularProgress, Stack } from "@mui/material";

const Loading = () => {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Stack>
  );
};

export default Loading;
