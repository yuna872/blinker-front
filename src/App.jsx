import React from "react";
import { RouterProvider } from "react-router-dom";
import { GlobalStyles, ThemeProvider } from "@mui/material";
import router from "./layouts/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DialogProvider } from "@components/Dialog/DialogProvider";
import { theme } from "@styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: { margin: 0 } }} />
      <DialogProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-center"
          theme="dark"
          hideProgressBar={true}
          autoClose={3000}
        />
      </DialogProvider>
    </ThemeProvider>
  );
}

export default App;
