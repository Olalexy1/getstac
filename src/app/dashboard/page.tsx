"use client";

import { useContext } from "react";
import { DashboardUserContext } from "./layout";
import { getTimeBasedGreeting } from "@/lib/utils";

export default function DashboardPage() {
  const authUser = useContext(DashboardUserContext);
  const { greeting, message } = getTimeBasedGreeting();

  // If somehow not available, show nothing (should never trigger)
  if (!authUser) return null;

  return (
    <section className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
          <div>
            <p className="text-gray-600 mt-2 mb-6">
              {greeting}, {authUser.firstName}!
            </p>
            <p className="text-gray-600">{message}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
