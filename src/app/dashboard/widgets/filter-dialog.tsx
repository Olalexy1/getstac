import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { FilterState, Location } from "@/types/location";
import { Button } from "@/components/ui/button";

export function FilterDialog({
  open,
  onOpenChange,
  filters,
  onApplyFilters,
  allLocations,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: FilterState;
  onApplyFilters: (filters: FilterState) => void;
  allLocations: Location[];
}) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  const uniqueRegions = Array.from(
    new Set(allLocations.map((l) => l.region))
  ).sort();
  const uniqueManagers = Array.from(
    new Set(allLocations.map((l) => l.manager))
  ).sort();
  const uniqueFeeStatuses = Array.from(
    new Set(allLocations.map((l) => l.feeStatus))
  ).sort();

  const toggleArrayFilter = (category: keyof FilterState, value: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((v) => v !== value)
        : [...prev[category], value],
    }));
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onOpenChange(false);
  };

  const handleClear = () => {
    const emptyFilters: FilterState = {
      regions: [],
      managers: [],
      feeStatus: [],
    };
    setLocalFilters(emptyFilters);
    onApplyFilters(emptyFilters);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Filter Locations</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Regions Filter */}
          <div>
            <Label className="text-base font-semibold mb-3 block">
              Regions
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {uniqueRegions.map((region) => (
                <div key={region} className="flex items-center space-x-2">
                  <Checkbox
                    id={`region-${region}`}
                    checked={localFilters.regions.includes(region)}
                    onCheckedChange={() => toggleArrayFilter("regions", region)}
                  />
                  <label
                    htmlFor={`region-${region}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {region}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Managers Filter */}
          <div>
            <Label className="text-base font-semibold mb-3 block">
              Managers
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {uniqueManagers.map((manager) => (
                <div key={manager} className="flex items-center space-x-2">
                  <Checkbox
                    id={`manager-${manager}`}
                    checked={localFilters.managers.includes(manager)}
                    onCheckedChange={() =>
                      toggleArrayFilter("managers", manager)
                    }
                  />
                  <label
                    htmlFor={`manager-${manager}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {manager}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Fee Status Filter */}
          <div>
            <Label className="text-base font-semibold mb-3 block">
              Fee Status
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {uniqueFeeStatuses.map((status) => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox
                    id={`fee-${status}`}
                    checked={localFilters.feeStatus.includes(status)}
                    onCheckedChange={() =>
                      toggleArrayFilter("feeStatus", status)
                    }
                  />
                  <label
                    htmlFor={`fee-${status}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {status}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClear}>
            Clear All
          </Button>
          <Button onClick={handleApply}>Apply Filters</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
