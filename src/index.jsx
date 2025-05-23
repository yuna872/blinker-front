import React from "react";
import ReactDOM from "react-dom/client"; // createRoot 메서드를 가져오기
import App from "./App";
import { ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "store/store";
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root")); // ReactDOM.createRoot 사용
root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </Provider>
    </ThemeProvider>
  </QueryClientProvider>
);
