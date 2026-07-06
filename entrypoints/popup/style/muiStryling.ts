import { createTheme } from "@mui/material/styles";

// 1. Define the base theme (palette, typography, etc.)
const themeBase = createTheme({
  palette: {
    primary: { main: "#95959f" },
    secondary: { main: "#5e5d62" },
    error: { main: "#d32f2f" },
    warning: { main: "#ed6c02" },
    info: { main: "#494be7" },
    success: { main: "#2e7d32" },
    background: { default: "#19191b" },
  },
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
  },
});

export const theme = createTheme(themeBase, {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: themeBase.palette.background.default,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: themeBase.palette.primary.main,
          textTransform: "none",
          borderRadius: 12,
        },
      },
    },
  },
});
