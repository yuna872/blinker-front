import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Monitoring from "../pages/Monitoring";
import AdminMonitoring from "../pages/Admin/Monitoring";
import Sensors from "../pages/Admin/Sensors";
import Settings from "../pages/Admin/Settings";
import Group from "../pages/Admin/Group";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "monitoring",
        element: <Monitoring />,
      },
      {
        path: "admin",
        children: [
          {
            path: "monitoring",
            element: <AdminMonitoring />,
          },
          {
            path: "sensors",
            element: <Sensors />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "group",
            element: <Group />,
          },
        ],
      },
    ],
  },
]);

export default router;
