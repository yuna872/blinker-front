import React from "react";
import { Button, MenuItem, Stack, Typography } from "@mui/material";
import { TextField } from "@components/TextField";
import { Select } from "@components/Select";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { theme } from "@styles/theme";
import { useSignup } from "@apis/auth/useSignup";
import { useNavigate } from "react-router-dom";
import { showToast } from "@utils/toast";

const Signup = () => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      userId: "",
      username: "",
      password: "",
      passwordCheck: "",
      role: "USER",
    },
  });

  const { mutateAsync: signup } = useSignup();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const { passwordCheck, ...signupData } = formData;
    console.log(signupData);

    try {
      await signup(signupData).then((data) => {
        // {message: '성공', code: 'SUCCESS', response: 13}
        if (data.code === "SUCCESS") {
          if (
            window.confirm(
              "회원가입이 완료되었습니다. 로그인 페이지로 이동합니다."
            )
          )
            navigate("/login");
        }
      });
    } catch (error) {
      showToast.error(error?.response?.data?.message);
    }
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
      }}
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
          회원가입
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
            <Typography>사용자명</Typography>
            <TextField
              type="text"
              name="username"
              {...register("username", {
                required: "사용자명을 입력해주세요.",
              })}
              error={!!errors.username}
            />
            <ErrorMessage
              errors={errors}
              name="username"
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
          <Stack>
            <Typography>비밀번호 확인</Typography>
            <TextField
              type="password"
              name="passwordCheck"
              {...register("passwordCheck", {
                validate: (value) =>
                  value === watch("password") ||
                  "비밀번호가 일치하지 않습니다.",
              })}
              error={!!errors.passwordCheck}
            />
            <ErrorMessage
              errors={errors}
              name="passwordCheck"
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
            <Typography>관리등급</Typography>
            <Select
              name="role"
              value={watch("role")}
              onChange={(e) => setValue("role", e.target.value)}
            >
              <MenuItem value="USER">USER</MenuItem>
              <MenuItem value="ADMIN">ADMIN</MenuItem>
            </Select>
          </Stack>
        </Stack>
        <Button type="submit" variant="contained" sx={{ width: "100%" }}>
          회원가입
        </Button>
      </Stack>
    </Stack>
  );
};

export default Signup;
