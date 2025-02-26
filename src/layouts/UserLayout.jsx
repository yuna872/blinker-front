import { getCookies } from "@apis/auth/cookie";
import Header from "@layouts/Header";
import { Navigate } from "react-router-dom";

const UserLayout = ({ children }) => {
  const isAuthenticated = !!getCookies("accessToken");
  const isAdmin = getCookies("role") === "ADMIN" ? true : false;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (isAdmin) {
    return <Navigate to="/admin/monitoring" />;
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default UserLayout;
