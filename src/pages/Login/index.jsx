import React, { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { TextField } from "@components/TextField";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = formData;
    if (username === "" || password === "") {
      alert("아이디, 비밀번호를 입력해주세요");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.code === "SUCCESS") {
        localStorage.setItem("Authorization", `Bearer ${data.response}`);
        alert("로그인 성공!");
        window.location.href = "/main";
      } else {
        alert(data.message || "로그인 실패");
      }
    } catch (error) {
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <Stack
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
          로그인
        </Typography>
        <Stack sx={{ gap: "10px", width: "100%" }}>
          <Stack>
            <Typography>아이디</Typography>
            <TextField
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </Stack>
          <Stack>
            <Typography>암호</Typography>
            <TextField
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Stack>
        </Stack>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ width: "100%" }}
        >
          로그인
        </Button>
      </Stack>
    </Stack>
  );
};

export default Login;
