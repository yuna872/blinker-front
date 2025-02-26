import { Navigate, Outlet } from "react-router-dom";
import Header from "@layouts/Header";
import { getCookies } from "@apis/auth/cookie";

const AdminLayout = () => {
  const isAuthenticated = !!getCookies("accessToken");
  const isAdmin = getCookies("role") === "ADMIN" ? true : false;
  console.log(isAuthenticated, isAdmin);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (!isAdmin) {
    return <Navigate to="/monitoring" />;
  }

  return (
    <>
      <Header isAdmin />
      <Outlet />
    </>
  );
};

export default AdminLayout;
