"use client";

import { useEffect, createContext } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getAuthSession } from "@/store/auth-store";
import { AuthUser } from "@/types/auth";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

export const DashboardUserContext = createContext<AuthUser | null>(null);

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function ProtectedDashboardLayout({
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
    <div
      className={cn(
        "bg-background overscroll-none font-sans antialiased",
        fontSans.className
      )}
      id="protected-layout"
    >
      <DashboardUserContext.Provider value={authUser}>
        <SidebarProvider>
          <AppSidebar variant="sidebar" />
          <SidebarInset className="bg-[#F1F1F1]">
            <AppHeader user={authUser} />
            {children}
          </SidebarInset>
        </SidebarProvider>
      </DashboardUserContext.Provider>
    </div>
  );
}
