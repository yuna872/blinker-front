import { Button, Stack, Typography } from "@mui/material";
import Title from "../Title";
import { grey } from "@mui/material/colors";
import { TextField } from "../TextField";

const UserInfo = () => {
  const fieldStyle = {
    flexDirection: "row",
    gap: "10px",
    alignItems: "center",
    padding: "0 15px",
  };

  const labelStyle = {
    minWidth: "70px",
    width: "70px",
    fontSize: "14px",
  };

  return (
    <Stack
      sx={{
        borderRight: `1px solid ${grey[200]}`,
      }}
    >
      <Title title="사용자 정보" />
      <Stack sx={{ gap: "10px", padding: "10px" }}>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>ID</Typography>
          <TextField fullWidth />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>암호</Typography>
          <TextField fullWidth />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>암호 확인</Typography>
          <TextField fullWidth />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>이름</Typography>
          <TextField fullWidth />
        </Stack>
      </Stack>
      <Button variant="outlined" sx={{ margin: "15px" }}>
        저장
      </Button>
    </Stack>
  );
};

export default UserInfo;
