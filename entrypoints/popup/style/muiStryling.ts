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
          maxWidth: "20rem",
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
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: "8px",
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
