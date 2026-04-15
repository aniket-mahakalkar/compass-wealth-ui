import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { AllRoutes, type AppRoute, type SidebarIcon } from "@/routes/allRoutes";
import { Compass, LayoutDashboard, LogOut, ShieldCheck, Wallet } from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { ComponentType } from "react";
import type { AppPermission } from "@/types/auth";

type SidebarRoute = AppRoute & {
  permission: AppPermission;
  sidebarLabel: string;
  sidebarIcon: SidebarIcon;
};

const sidebarIconMap: Record<SidebarIcon, ComponentType<{ className?: string }>> = {
  dashboard: LayoutDashboard,
  investments: Wallet,
  "admin-users": ShieldCheck,
};

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hasPermission, logout } = useAuth();

  const sidebarRoutes = AllRoutes.filter(
    (route): route is SidebarRoute =>
      route.useMainLayout === true &&
      route.permission !== "public" &&
      Boolean(route.sidebarLabel) &&
      Boolean(route.sidebarIcon) &&
      hasPermission(route.permission),
  );

  return (
    <SidebarProvider className="dark">
      <Sidebar collapsible="icon" variant="inset" className="border-sidebar-border">
          <SidebarHeader>
          <div className="flex items-center gap-2 overflow-hidden rounded-md px-2 py-1.5 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
              <span className="rounded-md bg-primary text-primary-foreground p-1">
                <Compass size={16} />
              </span>
            <span className="truncate font-semibold tracking-tight group-data-[collapsible=icon]:hidden">
              CompassWealth
            </span>
            </div>
          </SidebarHeader>

          <SidebarSeparator />

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarRoutes.map((route) => {
                    const Icon = sidebarIconMap[route.sidebarIcon];
                    const isActive = location.pathname.startsWith(route.path);

                    return (
                      <SidebarMenuItem key={route.path}>
                        <SidebarMenuButton asChild isActive={isActive}>
                          <Link to={route.path}>
                            <Icon />
                            <span>{route.sidebarLabel}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <Button
              variant="ghost"
              className="justify-start"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </SidebarFooter>
      </Sidebar>

      <SidebarInset className="bg-background text-foreground">
        <header className="flex h-14 items-center border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
