"use client";

import { useContext } from "react";
import { DashboardUserContext } from "./layout";
import { getTimeBasedGreeting } from "@/lib/utils";
import { toast } from "sonner";
import {
  CashPickupChart,
  LocationsTable,
  QuickActions,
  StatCard,
} from "./widgets";

const sampleLocations = [
  {
    id: "1",
    name: "Bokku - Lekki",
    region: "Bokku - Region 1",
    manager: "Cynthia Ofori",
    openingBalance: "₦8,570,000",
    remainingBalance: "₦570,000",
    amountMopped: "₦8,000,000",
    feeStatus: "Daily Fee",
  },
  {
    id: "2",
    name: "Bokku - Egbeda",
    region: "Bokku - Region 2",
    manager: "Adetola Makinde",
    openingBalance: "₦3,900,000",
    remainingBalance: "₦1,000,000",
    amountMopped: "₦2,900,000",
    feeStatus: "Weekend Fee",
  },
];

export default function DashboardPage() {
  const authUser = useContext(DashboardUserContext);
  const { greeting, message } = getTimeBasedGreeting();

  if (!authUser) return null;

  const handleExport = () => {
    toast.info("Report exported", {
      description: "Your cash pickup report has been exported successfully.",
    });
  };

  const handleQuickAction = (action: string) => {
    toast.info(action, {
      description: `Opening ${action.toLowerCase()} dialog...`,
    });
  };

  return (
    <section className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
          <div>
            <p className="text-[#242440] font-semibold text-[22px]">
              {greeting}, {authUser.firstName}?
            </p>
            <p className="text-[#52525B] text-[16px]">{message}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <StatCard label="Balance Across Stores" value="₦50,000,000" />
            <StatCard label="Today's Transactions" value="200" />
            <StatCard label="Total Locations" value="78" />
            <StatCard label="Total Managers" value="78" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
            <div className="lg:col-span-2">
              <CashPickupChart onExport={handleExport} />
            </div>
            <div>
              <QuickActions
                onCreateLocation={() =>
                  handleQuickAction("Create a new location")
                }
                onCreateManager={() =>
                  handleQuickAction("Create a new Manager")
                }
                onCreateRegion={() => handleQuickAction("Create a new Region")}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-[#242440]">
                  Today&apos;s Trending Locations
                </h3>
              </div>
              <a
                href="/dashboard/locations"
                className="text-[#242440] hover:text-[#242440]/80 underline text-[14px]"
              >
                Monitor Location Activities
              </a>
            </div>
            <LocationsTable data={sampleLocations} />
          </div>
        </div>
      </div>
    </section>
  );
}
