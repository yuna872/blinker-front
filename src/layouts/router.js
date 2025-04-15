import { createBrowserRouter } from "react-router-dom";
import Login from "@pages/Auth/Login";
import Signup from "@pages/Auth/Signup";
import Monitoring from "@pages/User/Monitoring";
import AdminMonitoring from "@pages/Admin/Monitoring";
import Sensors from "@pages/Admin/Sensors";
import Settings from "@pages/Admin/Settings";
import Group from "@pages/Admin/Group";
import PasswordChange from "@pages/Auth/PasswordChange";
import Layouts from "./Layouts";
import RedirectByRole from "./RedirectByRole";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layouts />,
      children: [
        {
          index: true,
          element: <RedirectByRole />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "password-change",
          element: <PasswordChange />,
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
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);

export default router;
