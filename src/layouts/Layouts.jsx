import { Stack } from "@mui/material";

const { Outlet, Navigate, useLocation } = require("react-router-dom");
const { default: Header, GNB_HEIGHT } = require("./Header");
const { getCookies } = require("@apis/auth/cookie");

const Layouts = () => {
  const location = useLocation();
  const isAuthenticated = !!getCookies("accessToken");
  const isAdmin = getCookies("role") === "ADMIN" ? true : false;

  // 회원가입, 로그인 페이지는 토큰 확인 X
  const authPages = ["/login", "/signup"];
  if (authPages.includes(location.pathname)) {
    return <Outlet />;
  }

  return (
    <Stack
      sx={{
        maxHeight: `100vh`,
        height: "100vh", // 최대 높이를 화면 높이로 설정
        overflow: "auto", // 내용이 넘칠 경우 스크롤 활성화
        width: "100%", // 전체 너비 사용
      }}
    >
      <Header isAdmin={isAdmin} />
      {isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />}
    </Stack>
  );
};

export default Layouts;
