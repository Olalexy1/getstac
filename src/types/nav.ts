import { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  key: string;
  icon: LucideIcon;
  url: string;
  isBadge: boolean;
}

export interface NavigationData {
  navMain: NavItem[];
  support: NavItem[];
}
