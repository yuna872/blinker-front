import { Stack, Typography } from "@mui/material";
import React from "react";
import { theme } from "@styles/theme";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { getCookies, removeCookies } from "@apis/cookie";
export const GNB_HEIGHT = 50;

const Header = ({ isAdmin }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const accessToken = getCookies("accessToken");
  if (!accessToken) navigate("/login");

  const links = [
    { to: "/admin/monitoring", label: "모니터링" },
    { to: "/admin/sensors", label: "센서위치" },
    { to: "/admin/settings", label: "설정" },
    { to: "/admin/group", label: "그룹관리" },
  ];

  const handleClickLogout = () => {
    removeCookies("accessToken");
    if (!getCookies("accessToken")) navigate("/login");
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
          {links.map((link) => {
            return (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  fontWeight: pathname === link.to ? 600 : 400,
                  color: pathname === link.to ? "white" : grey[400],
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </Stack>
      ) : (
        <Typography sx={{ fontSize: "18px" }}>
          Osan 스마트 음향 신호기 모니터링
        </Typography>
      )}

      {accessToken && (
        <Stack
          sx={{
            flexDirection: "row",
            gap: "15px",
            "& .MuiTypography-root": {
              cursor: "pointer",
              fontSize: "14px",
              ":hover": { scale: 1.01 },
            },
          }}
        >
          <Typography onClick={() => navigate("/password-change")}>
            비밀번호 변경
          </Typography>
          <Typography onClick={handleClickLogout}>로그아웃</Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default Header;
