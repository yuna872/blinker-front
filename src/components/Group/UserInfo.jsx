import { TextField } from "@components/TextField";
import Title from "@components/Title";
import { Button, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

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

  const selectedUser = useSelector((state) => state.selectedUser);

  const { handleSubmit, register, setValue } = useForm({
    defaultValues: {
      ID: selectedUser?.userId,
      userName: selectedUser?.username,
    },
  });

  if (selectedUser) {
    setValue("ID", selectedUser.userId);
    setValue("username", selectedUser.username);
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
          <Typography sx={labelStyle}>이름</Typography>
          <TextField fullWidth d {...register("username")} />
        </Stack>
      </Stack>
      <Button variant="outlined" sx={{ margin: "15px" }} type="submit">
        저장
      </Button>
    </Stack>
  );
};

export default UserInfo;
