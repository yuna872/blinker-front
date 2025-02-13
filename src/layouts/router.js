import { createBrowserRouter } from "react-router-dom";
import Login from "@pages/Login";
import Signup from "@pages/Signup";
import Monitoring from "@pages/Monitoring";
import AdminMonitoring from "@pages/Admin/Monitoring";
import Sensors from "@pages/Admin/Sensors";
import Settings from "@pages/Admin/Settings";
import Group from "@pages/Admin/Group";
import AdminLayout from "@layouts/AdminLayout";

const router = createBrowserRouter(
  [
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
          element: <AdminLayout />,
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
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);

export default router;
