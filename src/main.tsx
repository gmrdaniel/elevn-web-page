import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { elevnTheme } from "@/theme/elevnTheme";
import App from "@/App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={elevnTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
