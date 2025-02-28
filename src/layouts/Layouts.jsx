const { Outlet, Navigate, useLocation } = require("react-router-dom");
const { default: Header } = require("./Header");
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
    <>
      <Header isAdmin={isAdmin} />
      {isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />}
    </>
  );
};

export default Layouts;
