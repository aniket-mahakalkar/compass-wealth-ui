import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Auth from "./pages/AuthPage/Auth";
import Dashboard from "./pages/Dashboard/Dashboard";
import RouteGuard from "./routes/RouteGuard";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import AdminUsers from "./pages/AdminUsers/AdminUsers";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route element={<RouteGuard requiredPermission="route:dashboard" />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<RouteGuard requiredPermission="route:admin" />}>
          <Route path="/admin/users" element={<AdminUsers />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
