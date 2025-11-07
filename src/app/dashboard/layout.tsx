"use client";

import { useEffect, createContext } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getAuthSession } from "@/store/auth-store";
import { AuthUser } from "@/types/auth";

export const DashboardUserContext = createContext<AuthUser | null>(null);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const authUser = getAuthSession();

  useEffect(() => {
    if (!authUser) {
      router.replace("/sign-in");
    }
  }, [authUser, router]);

  return (
    <DashboardUserContext.Provider value={authUser}>
      <SidebarProvider>
        <AppSidebar variant="inset"/>
        <SidebarInset>
          <AppHeader user={authUser} />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </DashboardUserContext.Provider>
  );
}
