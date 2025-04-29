import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layouts />,
      children: [
        {
          index: true,
          element: <RedirectByRole />,
        },
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'signup',
          element: <Signup />,
        },
        {
          path: 'password-change',
          element: <PasswordChange />,
        },
        {
          path: 'monitoring',
          element: <Monitoring />,
        },
        {
          path: 'admin',
          children: [
            {
              path: 'monitoring',
              element: <AdminMonitoring />,
            },
            {
              path: 'sensors',
              element: <Sensors />,
            },

            {
              path: 'settings',
              element: <Settings />,
            },
            {
              path: 'group',
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
