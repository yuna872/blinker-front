import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { TextField } from "@components/TextField";
import { useLogin } from "@apis/useLogin";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useNavigate } from "react-router-dom";
import { theme } from "@styles/theme";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      userId: "",
      password: "",
    },
  });
  const { mutateAsync: login } = useLogin();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    await login(formData).then((data) => {
      if (data.code === "SUCCESS") {
        if (data.response.roles[0] === "ADMIN") navigate("/admin/monitoring");
        else if (data.response.roles[0] === "USER") navigate("/monitoring");
      } else {
        alert(data?.message);
        reset();
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
              name="userId"
              {...register("userId", {
                required: "아이디를 입력해주세요.",
              })}
              error={!!errors.userId}
            />
            <ErrorMessage
              errors={errors}
              name="userId"
              render={({ message }) => (
                <Typography
                  sx={{ fontSize: "11px", color: theme.palette.error.main }}
                >
                  {message}
                </Typography>
              )}
            />
          </Stack>
          <Stack>
            <Typography>비밀번호</Typography>
            <TextField
              type="password"
              name="password"
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
              })}
              error={!!errors.password}
            />
          </Stack>
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => (
              <Typography
                sx={{ fontSize: "11px", color: theme.palette.error.main }}
              >
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
