import { Navigate, Outlet, useLocation } from "react-router-dom";
import type { AppPermission } from "@/types/auth";
import { useAuth } from "@/contexts/AuthContext";

interface RouteGuardProps {
  requiredPermission?: AppPermission;
}

const RouteGuard = ({ requiredPermission }: RouteGuardProps) => {
  const { isAuthenticated, hasPermission } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RouteGuard;
