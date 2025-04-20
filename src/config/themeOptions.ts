// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3BA57C",
      dark: "#2B8C6D",
      light: "#F2F9F6",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#5D6E7B",
    },
    background: {
      default: "#F9FCFD",
      paper: "#ffffff",
    },
    text: {
      primary: "#1F2D3D",
      secondary: "#6B7C93",
      disabled: "#A4B6C1",
    },
    divider: "#E3E8EF",
  },
  typography: {
    fontFamily: "Inter, Segoe UI, sans-serif",
    h1: { fontSize: "32px" },
    h2: { fontSize: "24px" },
    body1: { fontSize: "16px" },
    body2: { fontSize: "14px" },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0 1px 3px rgba(0,0,0,0.08)",
    "0 3px 6px rgba(0,0,0,0.1)",
    "0 6px 12px rgba(0,0,0,0.12)",
    "0 4px 8px rgba(0,0,0,0.15)",
    "0 2px 4px rgba(0,0,0,0.08)",
    "0 3px 5px rgba(0,0,0,0.1)",
    "0 4px 6px rgba(0,0,0,0.12)",
    "0 5px 7px rgba(0,0,0,0.15)",
    "0 6px 8px rgba(0,0,0,0.18)",
    "0 7px 9px rgba(0,0,0,0.2)",
    "0 8px 10px rgba(0,0,0,0.22)",
    "0 9px 11px rgba(0,0,0,0.24)",
    "0 10px 12px rgba(0,0,0,0.26)",
    "0 11px 13px rgba(0,0,0,0.28)",
    "0 12px 14px rgba(0,0,0,0.3)",
    "0 13px 15px rgba(0,0,0,0.32)",
    "0 14px 16px rgba(0,0,0,0.34)",
    "0 15px 17px rgba(0,0,0,0.36)",
    "0 16px 18px rgba(0,0,0,0.38)",
    "0 17px 19px rgba(0,0,0,0.4)",
    "0 18px 20px rgba(0,0,0,0.42)",
    "0 19px 21px rgba(0,0,0,0.44)",
    "0 20px 22px rgba(0,0,0,0.46)",
    "0 21px 23px rgba(0,0,0,0.48)",
  ],
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#1F2D3D",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          borderBottom: "1px solid #E3E8EF",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          padding: "8px 20px",
          boxShadow: "none",
        },
        containedPrimary: {
          backgroundColor: "#3BA57C",
          "&:hover": {
            backgroundColor: "#2B8C6D",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          },
        },
        textPrimary: {
          color: "#1F2D3D",
          "&:hover": {
            backgroundColor: "#E3E8EF",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #E3E8EF",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          borderRadius: 16,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          padding: "0 32px !important",
        },
      },
    },
  },
});

export default theme;
