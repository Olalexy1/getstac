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
                  "px-2.5 py-4 text-[#04111199] h-auto data-[active=true]:bg-[#0A4F4D0D] focus:bg-[#0A4F4D0D] hover:bg-[#0A4F4D0D] font-[450]",
                  isActive(pathname, item.url) &&
                    "duration-200 ease-linear active:bg-[#0A4F4D0D] active:text-[#034748]"
                )}
                onClick={() => setOpenMobile(false)}
              >
                <Link href={item.url}>
                  <item.icon className="size-6!" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
