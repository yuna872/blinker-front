import { Navigate } from "react-router-dom";
import { getCookies } from "@apis/auth/cookie";

const RedirectByRole = () => {
  const isAuthenticated = !!getCookies("accessToken");
  const isAdmin = getCookies("role") === "ADMIN";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return isAdmin ? (
    <Navigate to="/admin/monitoring" replace />
  ) : (
    <Navigate to="/monitoring" replace />
  );
};

export default RedirectByRole;
