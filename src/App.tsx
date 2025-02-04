import AuthProvider from "./contexts/authContext";
import Navbar from "./components/navbar/Navbar";
import AppRoutes from "./routes/routes";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Navbar />
        <AppRoutes />
      </AuthProvider>
    </Provider>
  );
}

export default App;
