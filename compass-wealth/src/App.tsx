import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import RouteGuard from "./routes/RouteGuard";
import MainLayout from "./components/MainLayout/MainLayout";
import { AllRoutes, type AppRoute } from "./routes/allRoutes";
import type { AppPermission } from "./types/auth";

type ProtectedRoute = AppRoute & { permission: AppPermission; useMainLayout: true };

function App() {
  const publicRoutes = AllRoutes.filter(
    (route) => route.permission === "public" && !route.useMainLayout,
  );
  const protectedRoutes = AllRoutes.filter(
    (route): route is ProtectedRoute =>
      route.permission !== "public" && route.useMainLayout === true,
  );

  return (
    <AuthProvider>
      <Routes>
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={<route.component />} />
        ))}

        <Route element={<RouteGuard />}>
          <Route element={<MainLayout />}>
            {protectedRoutes.map((route) => (
              <Route
                key={route.path}
                element={<RouteGuard requiredPermission={route.permission} />}
              >
                <Route path={route.path} element={<route.component />} />
              </Route>
            ))}
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
