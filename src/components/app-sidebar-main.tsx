"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { cn, isActive } from "@/lib/utils";
import { NavItem } from "@/types/nav";

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarGroup data-tour="nav-main">
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const active = isActive(pathname, item.url);

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={active}
                  asChild
                  onClick={() => setOpenMobile(false)}
                  className={cn(
                    "px-2.5 py-4 text-[#101010] h-auto data-[active=true]:bg-[#242440] focus:bg-[#242440] font-normal",
                    item.isBadge && "peer",
                    "hover:bg-[#242440] hover:text-[#FFFFFF]",
                    active && "duration-200 ease-linear active:bg-[#242440] active:text-[#FFFFFF]"
                  )}
                >
                  <Link href={item.url} className="flex items-center gap-3">
                    <item.icon
                      className={cn("size-3.5!", active && "text-[#FFFFFF]")}
                    />
                    <span className={cn("text-[13px]", active && "text-[#FFFFFF]")}>
                      {item.title}
                    </span>
                  </Link>
                </SidebarMenuButton>

                {item.isBadge && (
                  <SidebarMenuBadge
                    className={cn(
                      "bg-[#242440] text-[#FFFFFF] rounded-full transition-colors",
                      "peer-hover:bg-[#FFFFFF] peer-hover:text-[#242440]"
                    )}
                  >
                    15
                  </SidebarMenuBadge>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
