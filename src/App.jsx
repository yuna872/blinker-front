import React from "react";
import { RouterProvider } from "react-router-dom";
import { GlobalStyles } from "@mui/material";
import router from "./layouts/router";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles styles={{ body: { margin: 0 } }} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
