import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import AppRoutes from "./routes/routes";
import theme from "./config/themeOptions";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: theme.palette.background.default,
          },
        }}
      />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
