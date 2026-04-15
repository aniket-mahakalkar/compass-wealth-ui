import type { JSX } from "react";
import Auth from "../pages/AuthPage/Auth";

export const AllRoutes: {
  path: string;
  component: () => JSX.Element;
  permission: string;
}[] = [
  {
    path: "/",
    component: Auth,
    permission: "public",
  },
];
