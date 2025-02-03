import React from "react";
import { RouterProvider } from "react-router-dom";
import { GlobalStyles } from "@mui/material";
import router from "./layouts/router";

function App() {
  return (
    <>
      <GlobalStyles styles={{ body: { margin: 0 } }} />
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </>
  );
}

export default App;
