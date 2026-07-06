import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import "./style/style.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "./style/muiStryling.ts";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
