"use client";

import { useState } from "react";
import { toast } from "sonner";
import { FiltersBar, LocationsTable, StatCard } from "../widgets";

const allLocations = Array.from({ length: 78 }, (_, i) => ({
  id: `loc-${i + 1}`,
  name: `Bokku - Location ${i + 1}`,
  region: `Region ${Math.ceil((i + 1) / 12)}`,
  manager: `Manager ${i % 5 === 0 ? "A" : i % 5 === 1 ? "B" : i % 5 === 2 ? "C" : i % 5 === 3 ? "D" : "E"}`,
  openingBalance: `₦${(Math.random() * 10000000 + 1000000).toFixed(0)}`,
  remainingBalance: `₦${(Math.random() * 2000000 + 100000).toFixed(0)}`,
  amountMopped: `₦${(Math.random() * 5000000 + 500000).toFixed(0)}`,
  feeStatus: i % 2 === 0 ? "Daily Fee" : "Weekend Fee",
}));

const ITEMS_PER_PAGE = 5;

export default function LocationsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([
    "All stores",
    "Surulere, Ojodu",
  ]);

  const filteredLocations = allLocations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.manager.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLocations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedLocations = filteredLocations.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleSort = (column: string) => {
    toast.info("Sort clicked", { description: `Sorting by ${column}` });
  };

  const handleClearFilter = (filter: string) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filter));
    toast.info("Filter removed", {
      description: `${filter} has been removed`,
    });
  };

  const handleMoreFilters = () => {
    toast.info("Filters", {
      description: "Advanced filters dialog would open here",
    });
  };

  return (
    <section className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
          <div>
            <h2 className="text-lg font-semibold text-[#242440]">
              Today&apos;s Trending Locations
            </h2>
            <p className="text-[#52525B] text-[16px]">
              Overview of all the cash activities at your store
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <StatCard label="Total Active Locations" value="66" />
            <StatCard label="Total Deactivated Locations" value="10" />
            <StatCard label="Locations with Cash" value="10" />
            <StatCard label="Locations without Cash" value="10" />
          </div>

          <FiltersBar
            onSearch={setSearchQuery}
            onClearFilter={handleClearFilter}
            onMoreFilters={handleMoreFilters}
            activeFilters={activeFilters}
          />

          <LocationsTable
            data={paginatedLocations}
            onSort={handleSort}
            pageSize={ITEMS_PER_PAGE}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </section>
  );
}
