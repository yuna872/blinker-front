import { Stack } from "@mui/material";

const { Outlet, Navigate, useLocation } = require("react-router-dom");
const { default: Header } = require("./Header");
const { getCookies } = require("@apis/auth/cookie");

const Layouts = () => {
  const location = useLocation();
  const isAuthenticated = !!getCookies("accessToken");
  const isAdmin = getCookies("role") === "ADMIN" ? true : false;

  const layoutStyle = {
    maxHeight: `100vh`,
    height: "100vh",
    overflow: "auto", // 내용이 넘칠 경우 스크롤 활성화
    width: "100%",
  };
  
  // 회원가입, 로그인 페이지는 토큰 확인 X
  const authPages = ["/login", "/signup"];
  if (authPages.includes(location.pathname)) {
    return (
      <Stack sx={layoutStyle}>
        <Header isAdmin={isAdmin} />
        <Outlet />
      </Stack>
    );
  }

  // 나머지 페이지
  return (
    <Stack sx={layoutStyle}>
      <Header isAdmin={isAdmin} />
      {isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />}
    </Stack>
  );
};

export default Layouts;
