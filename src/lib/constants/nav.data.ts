import { NavigationData } from "@/types/nav";
import {
  LayoutDashboard,
  Users,
  MousePointerClick,
  BarChart3,
  Settings,
  ShieldCheck,
} from "lucide-react";


export const sidebarData: NavigationData = {
  navMain: [
    {
      title: "Dashboard",
      key: "dashboard",
      icon: LayoutDashboard,
      url: "/dashboard",
      isBadge: false,
    },
    {
      title: "Managers",
      key: "managers",
      icon: Users,
      url: "/dashboard/managers",
      isBadge: false,
    },
    {
      title: "Locations",
      key: "locations",
      icon: MousePointerClick,
      url: "/dashboard/locations",
      isBadge: false,
    },
    {
      title: "Billing & Invoices",
      key: "billing",
      icon: BarChart3,
      url: "/dashboard/billing",
      isBadge: true,
    },
  ],
  support: [
    {
      title: "Settings",
      key: "settings",
      icon: Settings,
      url: "/dashboard/settings",
      isBadge: false,
    },
    {
      title: "What is new?",
      key: "whats-new",
      icon: ShieldCheck,
      url: "/dashboard/whats-new",
      isBadge: false,
    },
    {
      title: "Custom Request",
      key: "custom-request",
      icon: ShieldCheck,
      url: "/dashboard/custom-request",
      isBadge: false,
    },
  ],
};
