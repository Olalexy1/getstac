"use client";

import { AuthUser } from "@/types/auth";
import { AccountManagerModal } from "./account-manager-modal";
import NotificationPopover from "./notification-popover";
import { UserDisplay } from "./user-display";
import { formatInitials } from "@/lib/utils";

interface AppHeaderProps {
  user: AuthUser | null;
}

export function AppHeader({ user }: AppHeaderProps) {
  const accountManager = {
    firstName: "Candice",
    lastName: "Ademide",
    email: "candice.ademide@getstac.com",
    phone: "+2349087254489",
    src: "/images/candice.png",
  };
  return (
    <header className="w-full flex items-center ease-linear justify-between border-[#F1F1F1] gap-1 px-4 lg:gap-2 lg:px-6 py-3">
      <UserDisplay
        src="/avatar.jpg"
        fallback={formatInitials(user?.firstName, user?.lastName)}
        name={`${user?.firstName} ${user?.lastName}`}
        store="Bokku HQ"
        isOnline
      />

      <div className="flex items-center gap-2">
        <AccountManagerModal manager={accountManager} />
        <NotificationPopover />
      </div>
    </header>
  );
}
