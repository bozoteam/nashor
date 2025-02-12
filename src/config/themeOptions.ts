import { createTheme, ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#7B3F00",
    },
    secondary: {
      main: "#427014",
    },
    background: {
      default: "#f7ebe1",
      paper: "#fff5e9",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.05)",
          border: "1px solid rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);
