"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn, isActive } from "@/lib/utils";
import { NavItem } from "@/types/nav";

export function NavSecondary({
  items,
  ...props
}: {
  items: NavItem[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarGroupLabel>Support</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                asChild
                isActive={isActive(pathname, item.url)}
                className={cn(
                  "px-2.5 py-4 text-[#101010] h-auto data-[active=true]:bg-[#242440] focus:bg-[#242440] hover:bg-[#242440] hover:text-[#FFFFFF] font-normal",
                  isActive(pathname, item.url) &&
                    "duration-200 ease-linear active:bg-[#242440] active:text-[#FFFFFF]"
                )}
                onClick={() => setOpenMobile(false)}
              >
                <Link href={item.url}>
                  <item.icon
                    className={cn(
                      "size-3.5!",
                      isActive(pathname, item.url) && "text-[#FFFFFF]"
                    )}
                  />
                  <span
                    className={cn(
                      "text-[13px]",
                      isActive(pathname, item.url) && "text-[#FFFFFF]"
                    )}
                  >
                    {item.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
