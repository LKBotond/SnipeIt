import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          boxSizing: "border-box",
          maxWidth: "30rem",
          margin: "0 auto",
          width: "100%",
        },
        "#root": {
          width: "100%",
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(6rem, 1fr))",
          gap: "0.5rem",
          width: "100%",
        },
        grouped: {
          border: "1px solid rgba(255, 255, 255, 0.23)",
          borderRadius: "4px",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        fullWidth: true,
      },
    },
  },
});