import { TextField } from "@components/TextField";
import Title from "@components/Title";
import { Button, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useForm } from "react-hook-form";

const UserInfo = ({ user }) => {
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

  const { handleSubmit, register, setValue } = useForm({
    defaultValues: {
      ID: user?.userId,
      password: "",
      passwordCheck: "",
      userName: user?.userName,
    },
  });

  if (user) {
    setValue("ID", user.userId);
    setValue("userName", user.userName);
  }

  const onSubmit = (formValue) => {
    console.log(formValue);
  };

  return (
    <Stack
      sx={{
        borderRight: `1px solid ${grey[200]}`,
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Title title="사용자 정보" />
      <Stack sx={{ gap: "10px", padding: "10px" }}>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>ID</Typography>
          <TextField fullWidth {...register("ID")} />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>암호</Typography>
          <TextField fullWidth {...register("password")} />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>암호 확인</Typography>
          <TextField fullWidth {...register("passwordCheck")} />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>이름</Typography>
          <TextField fullWidth d {...register("userName")} />
        </Stack>
      </Stack>
      <Button variant="outlined" sx={{ margin: "15px" }} type="submit">
        저장
      </Button>
    </Stack>
  );
};

export default UserInfo;
