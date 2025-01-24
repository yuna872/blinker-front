import { Outlet } from "react-router-dom";
import Header from "./Header";

const AdminLayout = () => {
  return (
    <>
      <Header isAdmin />
      <Outlet />
    </>
  );
};

export default AdminLayout;
