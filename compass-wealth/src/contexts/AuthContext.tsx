/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { AppPermission, AuthUser } from "../types/auth";
import { hasRolePermission } from "@/routes/permissions";

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  login: (user: AuthUser) => void;
  logout: () => void;
  hasPermission: (permission: AppPermission) => boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const getStoredUser = (): AuthUser | null => {
  const userData = localStorage.getItem("user");
  if (!userData) {
    return null;
  }

  try {
    return JSON.parse(userData) as AuthUser;
  } catch {
    localStorage.removeItem("user");
    return null;
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token"),
  );

  const login = (userData: AuthUser) => {
    setUser(userData);
    setToken(userData.token);
    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const hasPermission = (permission: AppPermission): boolean => {
    return hasRolePermission(user?.role, permission);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "ADMIN";

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        hasPermission,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
