import React from "react";
import { RouterProvider } from "react-router-dom";
import { GlobalStyles } from "@mui/material";
import router from "./layouts/router";
import Header from "./layouts/Header";

function App() {
  return (
    <>
      <GlobalStyles styles={{ body: { margin: 0 } }} />
      <Header />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
