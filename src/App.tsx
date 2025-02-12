import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import AuthProvider from "./contexts/authContext";
import AppRoutes from "./routes/routes";
import { theme } from "./config/themeOptions";

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
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
