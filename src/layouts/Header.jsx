import { Stack, Typography } from "@mui/material";
import React from "react";
import { theme } from "@styles/theme";
import { useLocation, useNavigate } from "react-router-dom";
import { getCookies, removeCookies } from "@apis/auth/cookie";
import { useDispatch } from "react-redux";
import { resetSelectedSensor } from "@store/selectedSensorSlice";
import { resetSelectedUser } from "@store/selectedUserSlice";
import { palette } from "@styles/palette";
import { AccountCircle } from "@mui/icons-material";
export const GNB_HEIGHT = 50;

const Header = ({ isAdmin }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = getCookies("accessToken");
  const userId = getCookies("userId");

  const links = [
    { to: "/admin/monitoring", label: "모니터링" },
    { to: "/admin/sensors", label: "센서위치" },
    { to: "/admin/settings", label: "설정" },
    { to: "/admin/group", label: "그룹관리" },
  ];

  const handleClickLogout = () => {
    removeCookies("accessToken");
    removeCookies("role");
    removeCookies("appUserId");
    removeCookies("userId");
    navigate("/login");

    // 리덕스 초기화
    dispatch(resetSelectedSensor());
    dispatch(resetSelectedUser());
  };

  const handleClickLink = (to) => {
    navigate(to);
    dispatch(resetSelectedSensor());
    dispatch(resetSelectedUser());
  };

  return (
    <Stack
      sx={{
        backgroundColor: theme.palette.primary.main,
        minHeight: `${GNB_HEIGHT}px`,
        padding: "0 15px",
        flexDirection: "row",
        justifyContent: accessToken ? "space-between" : "center",
        alignItems: "center",
      }}
    >
      {isAdmin ? (
        <Stack sx={{ flexDirection: "row", gap: "20px" }}>
          {links.map((link) => {
            return (
              <Typography
                key={link.to}
                onClick={() => {
                  handleClickLink(link.to);
                }}
                sx={{
                  cursor: "pointer",
                  fontWeight: pathname === link.to ? 600 : 400,
                  color: pathname === link.to ? "white" : palette.grey[400],
                }}
              >
                {link.label}
              </Typography>
            );
          })}
        </Stack>
      ) : (
        <Typography
          sx={{
            fontSize: "18px",
            color: "white",
            fontWeight: 600,
          }}
        >
          스마트 음향 신호기 모니터링
        </Typography>
      )}
      {accessToken && (
        <Stack
          sx={{
            flexDirection: "row",
            gap: "15px",
            alignItems: "center",
            "& .MuiTypography-root": {
              cursor: "pointer",
              fontSize: "14px",
              ":hover": { scale: 1.01 },
              color: "white",
              fontWeight: 600,
            },
          }}
        >
          <Stack
            sx={{ flexDirection: "row", alignItems: "center", gap: "5px" }}
          >
            <AccountCircle
              sx={{
                width: "20px",
                height: "20px",
                color: palette.common.white,
              }}
            />
            <Typography>{userId} 님</Typography>
          </Stack>
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
