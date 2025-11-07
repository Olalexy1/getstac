"use client";

import { useState, useMemo } from "react";
import { ArrowDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Pagination } from "./pagination";

interface Location {
  id: string;
  name: string;
  region: string;
  manager: string;
  openingBalance: string;
  remainingBalance: string;
  amountMopped: string;
  feeStatus: string;
}

interface LocationsTableProps {
  data: Location[];
  onSort?: (column: string) => void;
  pageSize?: number;
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

export function LocationsTable({
  data,
  onSort,
  pageSize = 6,
  totalPages,
  currentPage,
  onPageChange,
}: LocationsTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const safePage =
    totalPages && currentPage
      ? Math.min(Math.max(1, currentPage), totalPages)
      : 1;

  const currentItems = useMemo(() => {
    if (totalPages && currentPage) {
      return data.slice(0, pageSize);
    }
    return data;
  }, [data, pageSize, totalPages, currentPage]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === data.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(data.map((item) => item.id));
    }
  };

  return (
    <div className="overflow-x-auto rounded-md border border-gray-200">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-900 text-white">
            <th className="w-12 px-6 py-4 text-left">
              <Checkbox
                checked={selectedIds.length === data.length}
                onCheckedChange={toggleSelectAll}
                className="border-white"
              />
            </th>
            <th className="p-3 text-left">
              <button
                onClick={() => onSort?.("name")}
                className="flex items-center gap-2 text-xs font-medium hover:text-gray-300 cursor-pointer"
              >
                Location Name
                <ArrowDown className="h-4 w-4" />
              </button>
            </th>
            <th className="p-4 text-xs text-left font-medium">Region</th>
            <th className="p-4 text-xs text-left font-medium">Manager</th>
            <th className="p-4 text-xs text-left font-medium">
              Opening Balance
            </th>
            <th className="p-4 text-xs text-left font-medium">
              Remaining Balance
            </th>
            <th className="p-4 text-xs text-left font-medium">Amount Mopped</th>
            <th className="p-4 text-xs text-left font-medium">Fee Status</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {currentItems.map((location, index) => (
            <tr
              key={location.id}
              className={
                index % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"
              }
            >
              <td className="px-6 py-4">
                <Checkbox
                  checked={selectedIds.includes(location.id)}
                  onCheckedChange={() => toggleSelect(location.id)}
                />
              </td>
              <td className="p-4 text-xs font-medium text-[#333333]">
                {location.name}
              </td>
              <td className="p-4 text-xs font-medium text-[#333333]">
                {location.region}
              </td>
              <td className="p-4 text-xs font-medium text-[#333333]">
                {location.manager}
              </td>
              <td className="p-4 text-xs font-medium text-[#333333]">
                {location.openingBalance}
              </td>
              <td className="p-4 text-xs font-medium text-[#333333]">
                {location.remainingBalance}
              </td>
              <td className="p-4 text-xs font-medium text-[#333333]">
                {location.amountMopped}
              </td>
              <td className="p-4">
                <span
                  className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                    location.feeStatus === "Daily Fee"
                      ? "bg-green-100 text-[#222822]"
                      : "bg-purple-100 text-[#222822]"
                  }`}
                >
                  {location.feeStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages && currentPage && onPageChange && totalPages > 1 && (
        <div className="border-t border-gray-200 px-6 py-4 bg-[#FFFFFF]">
          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPrevious={() => onPageChange(currentPage - 1)}
            onNext={() => onPageChange(currentPage + 1)}
          />
        </div>
      )}
    </div>
  );
}
