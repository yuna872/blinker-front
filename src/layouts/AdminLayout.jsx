import { Outlet } from "react-router-dom";
import Header from "@layouts/Header";

const AdminLayout = () => {
  return (
    <>
      <Header isAdmin />
      <Outlet />
    </>
  );
};

export default AdminLayout;
