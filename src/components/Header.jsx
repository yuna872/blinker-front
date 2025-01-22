import { Stack, Typography } from "@mui/material";
import React from "react";
import { theme } from "../styles/theme";
import { Link } from "react-router-dom";
export const GNB_HEIGHT = 50;

const Header = () => {
  const isAdmin = false;
  const isLogin = localStorage.getItem("Authorization");

  const handleClickLogout = () => {
    localStorage.removeItem("Authorization");
    alert("로그아웃 되었습니다. 로그인 페이지로 이동합니다.");
    window.location.href = "/login";
  };

  return (
    <Stack
      sx={{
        backgroundColor: theme.palette.primary.main,
        minHeight: `${GNB_HEIGHT}px`,
        padding: "0 15px",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        "& p, a": {
          color: "white",
          textDecoration: "none",
          fontWeight: 600,
        },
      }}
    >
      {isAdmin ? (
        <Stack sx={{ flexDirection: "row", gap: "20px" }}>
          <Link to="#">모니터링</Link>
          <Link to="#">센서위치</Link>
          <Link to="#">설정</Link>
          <Link to="#">그룹관리</Link>
        </Stack>
      ) : (
        <Typography sx={{ fontSize: "18px" }}>
          Osan 스마트 음향 신호기 모니터링
        </Typography>
      )}
      {true && (
        <Typography
          onClick={handleClickLogout}
          sx={{ cursor: "pointer", ":hover": { scale: 1.01 } }}
        >
          로그아웃
        </Typography>
      )}
    </Stack>
  );
};

export default Header;
