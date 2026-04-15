import type { JSX } from "react";
import Auth from "../pages/AuthPage/Auth";
import Dashboard from "../pages/Dashboard/Dashboard";
import Unauthorized from "../pages/Unauthorized/Unauthorized";
import AdminUsers from "../pages/AdminUsers/AdminUsers";
import Investments from "../pages/Investments/Investments";
import type { AppPermission } from "@/types/auth";

export type SidebarIcon = "dashboard" | "investments" | "admin-users";

export type AppRoute = {
  path: string;
  component: () => JSX.Element;
  permission: AppPermission | "public";
  useMainLayout?: boolean;
  sidebarLabel?: string;
  sidebarIcon?: SidebarIcon;
};

export const AllRoutes: AppRoute[] = [
  {
    path: "/",
    component: Auth,
    permission: "public",
  },
  {
    path: "/dashboard",
    component: Dashboard,
    permission: "route:dashboard",
    useMainLayout: true,
    sidebarLabel: "Dashboard",
    sidebarIcon: "dashboard",
  },
  {
    path: "/investments",
    component: Investments,
    permission: "route:dashboard",
    useMainLayout: true,
    sidebarLabel: "Investments",
    sidebarIcon: "investments",
  },
  {
    path: "/unauthorized",
    component: Unauthorized,
    permission: "public",
  },
  {
    path: "/admin/users",
    component: AdminUsers,
    permission: "route:admin",
    useMainLayout: true,
    sidebarLabel: "Admin Users",
    sidebarIcon: "admin-users",
  },
];
