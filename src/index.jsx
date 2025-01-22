import React from "react";
import ReactDOM from "react-dom/client"; // createRoot 메서드를 가져오기
import App from "./App";
import { ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";

const root = ReactDOM.createRoot(document.getElementById("root")); // ReactDOM.createRoot 사용
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
