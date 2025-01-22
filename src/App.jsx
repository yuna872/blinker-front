import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Monitoring from "./pages/Monitoring";
import { GlobalStyles } from "@mui/material";

function App() {
  return (
    <>
      <GlobalStyles styles={{ body: { margin: 0 } }} />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/monitoring" element={<Monitoring />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
