import React, { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { TextField } from "@components/TextField";
import axios from "axios";

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
