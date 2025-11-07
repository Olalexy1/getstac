"use client";

import { useState } from "react";
import { toast } from "sonner";
import { FiltersBar, LocationsTable, StatCard } from "../widgets";
import { FilterDialog } from "../widgets/filter-dialog";
import { FilterState } from "@/types/location";

const allLocations = Array.from({ length: 78 }, (_, i) => ({
  id: `loc-${i + 1}`,
  name: `Bokku - Location ${i + 1}`,
  region: `Region ${Math.ceil((i + 1) / 12)}`,
  manager: `Manager ${i % 5 === 0 ? "A" : i % 5 === 1 ? "B" : i % 5 === 2 ? "C" : i % 5 === 3 ? "D" : "E"}`,
  openingBalance: `₦${(Math.round(Math.random() * 10000000 + 1000000)).toLocaleString('en-US')}`,
  remainingBalance: `₦${(Math.round(Math.random() * 2000000 + 100000)).toLocaleString('en-US')}`,
  amountMopped: `₦${(Math.round(Math.random() * 5000000 + 500000)).toLocaleString('en-US')}`,
  feeStatus: i % 2 === 0 ? "Daily Fee" : "Weekend Fee",
}));

const ITEMS_PER_PAGE = 5;

export default function LocationsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    regions: [],
    managers: [],
    feeStatus: [],
  });
  const [showFilterDialog, setShowFilterDialog] = useState(false);

  const filteredLocations = allLocations.filter((location) => {
    const matchesSearch =
      searchQuery === "" ||
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.manager.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.region.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRegion =
      filters.regions.length === 0 || filters.regions.includes(location.region);

    const matchesManager =
      filters.managers.length === 0 ||
      filters.managers.includes(location.manager);

    const matchesFeeStatus =
      filters.feeStatus.length === 0 ||
      filters.feeStatus.includes(location.feeStatus);

    return matchesSearch && matchesRegion && matchesManager && matchesFeeStatus;
  });

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const activeLocations = filteredLocations.length;

  const activeFilterPills: Array<{ label: string; onRemove: () => void }> = [];

  filters.regions.forEach((region) => {
    activeFilterPills.push({
      label: region,
      onRemove: () =>
        setFilters((prev) => ({
          ...prev,
          regions: prev.regions.filter((r) => r !== region),
        })),
    });
  });

  filters.managers.forEach((manager) => {
    activeFilterPills.push({
      label: manager,
      onRemove: () =>
        setFilters((prev) => ({
          ...prev,
          managers: prev.managers.filter((m) => m !== manager),
        })),
    });
  });

  filters.feeStatus.forEach((status) => {
    activeFilterPills.push({
      label: status,
      onRemove: () =>
        setFilters((prev) => ({
          ...prev,
          feeStatus: prev.feeStatus.filter((s) => s !== status),
        })),
    });
  });

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
    const filterCategories: (keyof FilterState)[] = ['regions', 'managers', 'feeStatus'];
    
    for (const category of filterCategories) {
      if (filters[category].includes(filter)) {
        setFilters(prev => ({
          ...prev,
          [category]: prev[category].filter(f => f !== filter)
        }));
        break;
      }
    }
    
    toast.info("Filter removed", {
      description: `${filter} has been removed`,
    });
  };

  const handleMoreFilters = () => {
    setShowFilterDialog(true);
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
            <StatCard label="Total Active Locations" value={activeLocations.toString()} />
            <StatCard label="Total Deactivated Locations" value="10" />
            <StatCard label="Locations with Cash" value="10" />
            <StatCard label="Locations without Cash" value="10" />
          </div>

          <FiltersBar
            onSearch={setSearchQuery}
            onClearFilter={handleClearFilter}
            onMoreFilters={handleMoreFilters}
            activeFilters={activeFilterPills}
            handleSearchChange={handleSearchChange}
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

      <FilterDialog
        open={showFilterDialog}
        onOpenChange={setShowFilterDialog}
        filters={filters}
        onApplyFilters={handleFiltersChange}
        allLocations={allLocations}
      />
    </section>
  );
}
