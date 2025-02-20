import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { TextField } from "@components/TextField";
import { useLogin } from "@apis/useLogin";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { mutateAsync: login } = useLogin();

  const onSubmit = async (formData) => {
    console.log(formData);

    await login(formData).then((data) => {
      if (data.code === "SUCCESS") {
        alert(`어서오세요 ${data.response?.roles[0]}`);
      } else if (data.code === "U002") {
        alert(data.message);
      }
    });
  };

  return (
    <Stack
      component="form"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
      }}
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
          로그인
        </Typography>
        <Stack sx={{ gap: "10px", width: "100%" }}>
          <Stack>
            <Typography>아이디</Typography>
            <TextField
              type="text"
              name="username"
              {...register("username", {
                required: "아이디를 입력해주세요.",
              })}
              error={errors.username}
            />
            <ErrorMessage
              errors={errors}
              name="username"
              render={({ message }) => (
                <Typography sx={{ fontSize: "11px", color: "#FF3C3C" }}>
                  {message}
                </Typography>
              )}
            />
          </Stack>
          <Stack>
            <Typography>암호</Typography>
            <TextField
              type="password"
              name="password"
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
              })}
              error={errors.password}
            />
          </Stack>
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => (
              <Typography sx={{ fontSize: "11px", color: "#FF3C3C" }}>
                {message}
              </Typography>
            )}
          />
        </Stack>
        <Button type="submit" variant="contained" sx={{ width: "100%" }}>
          로그인
        </Button>
      </Stack>
    </Stack>
  );
};

export default Login;
