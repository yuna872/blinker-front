import TextFieldErrorMessage from "@components/Group/TextFieldErrorMessage";
import { TextField } from "@components/TextField";
import { useForm } from "react-hook-form";

const { Stack, Typography, Button } = require("@mui/material");

const PasswordChange = () => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: {
      newPassword: "",
      newPasswordCheck: "",
    },
  });

  const onSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack
        sx={{
          width: "300px",
          padding: "20px",
          margin: "auto",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          alignItems: "center",
          gap: "20px",
          backgroundColor: "#fff",
        }}
      >
        <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
          비밀번호 변경
        </Typography>
        <Stack sx={{ gap: "10px", width: "100%" }}>
          <Stack>
            <Typography>현재 비밀번호</Typography>
            <TextField
              type="password"
              {...register("currentPassword", {
                required: "현재 비밀번호를 입력해주세요.",
              })}
              error={errors.currentPassword}
            />
            <TextFieldErrorMessage name={"currentPassword"} errors={errors} />
          </Stack>
          <Stack>
            <Typography>새 비밀번호</Typography>
            <TextField
              type="password"
              {...register("newPassword", {
                required: "새 비밀번호를 입력해주세요.",
              })}
              error={errors.newPassword}
            />
            <TextFieldErrorMessage name={"newPassword"} errors={errors} />
          </Stack>
          <Stack>
            <Typography>새 비밀번호 확인</Typography>
            <TextField
              type="password"
              {...register("newPasswordCheck", {
                required: "새 비밀번호 확인을 입력해주세요.",
                validate: (value) =>
                  value === watch("newPassword") ||
                  "비밀번호가 일치하지 않습니다.",
              })}
              error={errors.newPasswordCheck}
            />
            <TextFieldErrorMessage name={"newPasswordCheck"} errors={errors} />
          </Stack>
        </Stack>
        <Stack
          sx={{
            flexDirection: "row",
            width: "100%",
            gap: "10px",
          }}
        >
          <Button variant="outlined" fullWidth>
            취소
          </Button>
          <Button type="submit" variant="contained" fullWidth>
            비밀번호 변경
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PasswordChange;
