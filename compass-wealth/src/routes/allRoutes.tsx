import type { JSX } from "react";
import Auth from "../pages/AuthPage/Auth";
import Dashboard from "../pages/Dashboard/Dashboard";
import Unauthorized from "../pages/Unauthorized/Unauthorized";
import AdminUsers from "../pages/AdminUsers/AdminUsers";
import type { AppPermission } from "@/types/auth";

export const AllRoutes: {
  path: string;
  component: () => JSX.Element;
  permission: AppPermission | "public";
}[] = [
  {
    path: "/",
    component: Auth,
    permission: "public",
  },
  {
    path: "/dashboard",
    component: Dashboard,
    permission: "route:dashboard",
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
  },
];
