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
          maxWidth: "30rem",
          margin: "0 auto",
          padding: "1rem",
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
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          flex: 1,
          textTransform: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
  },
});
