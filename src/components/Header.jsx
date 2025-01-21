import { Stack, Typography } from "@mui/material";
import React from "react";
const GNB_HEIGHT = 50;

const Header = () => {
  const isLogin = localStorage.getItem("Authorization");

  const handleClickLogout = () => {
    localStorage.removeItem("Authorization");
    alert("로그아웃 되었습니다. 로그인 페이지로 이동합니다.");
    window.location.href = "/login";
  };

  return (
    <Stack
      sx={{
        backgroundColor: "#6002ee",
        minHeight: `${GNB_HEIGHT}px`,
        padding: "0 15px",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        "& p": {
          color: "white",
        },
      }}
    >
      <Typography sx={{ color: "white", fontWeight: 600, fontSize: "18px" }}>
        Osan 스마트 음향 신호기 모니터링
      </Typography>
      {true && (
        <Typography
          onClick={handleClickLogout}
          sx={{ cursor: "pointer", ":hover": { scale: 1.03 } }}
        >
          로그아웃
        </Typography>
      )}
    </Stack>
  );
};

export default Header;
