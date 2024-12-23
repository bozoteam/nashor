import AuthProvider from "./contexts/authContext";
import Navbar from "./components/navbar/Navbar";
import AppRoutes from "./routes/routes";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
