import React from "react";
import { RouterProvider } from "react-router-dom";
import { GlobalStyles } from "@mui/material";
import router from "./layouts/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <GlobalStyles styles={{ body: { margin: 0 } }} />
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        theme="dark"
        hideProgressBar={true}
        autoClose={3000}
      />
    </>
  );
}

export default App;
