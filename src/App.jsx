import React from "react";
import { Outlet, RouterProvider } from "react-router-dom";
import { GlobalStyles } from "@mui/material";
import router from "./layouts/router";
import Header from "./layouts/Header";

function App() {
  return (
    <>
      <GlobalStyles styles={{ body: { margin: 0 } }} />
      <RouterProvider router={router}>
        <Header />
      </RouterProvider>
    </>
  );
}

export default App;
