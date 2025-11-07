import * as React from "react";
import Image from "next/image";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { sidebarData } from "@/lib/constants/nav.data";
import { NavMain } from "./app-sidebar-main";
import { NavSecondary } from "./app-sidebar-secondary";
import { Search } from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="bg-[#FFFFFF]">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="data-[slot=sidebar-menu-button]:py-1.5!"
            >
              <div className="flex justify-between items-center gap-2">
                <a href="#" className="flex items-center gap-2">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Image
                      src="/images/getstac-logo.png"
                      sizes="20px"
                      alt="Logo"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-medium">GETSTAC</span>
                  </div>
                </a>
                <SidebarTrigger className="-ml-1" />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <div className="flex items-center gap-2 px-3 py-2">
          <InputGroup>
            <InputGroupInput placeholder="Search" />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <NavMain items={sidebarData.navMain} />
        <NavSecondary items={sidebarData.support} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
