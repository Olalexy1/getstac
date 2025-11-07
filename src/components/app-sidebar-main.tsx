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
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                isActive={isActive(pathname, item.url)}
                className={cn(
                  "px-2.5 py-4 text-[#04111199] h-auto data-[active=true]:bg-[#0A4F4D0D] focus:bg-[#0A4F4D0D] hover:bg-[#0A4F4D0D] font-[450]",
                  isActive(pathname, item.url) &&
                    "duration-200 ease-linear active:bg-[#0A4F4D0D] active:text-[#034748]"
                )}
                asChild
                onClick={() => setOpenMobile(false)}
              >
                <Link href={item.url} className="">
                  {item.icon && <item.icon className="!size-5" />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
              {item.isBadge && (
                <SidebarMenuBadge className="bg-primary/10 rounded-full">
                  15
                </SidebarMenuBadge>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
