"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Search, ListFilter } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

interface FilterPill {
  label: string;
  onRemove: () => void;
}

interface FiltersBarProps {
  onSearch?: (query: string) => void;
  onClearFilter?: (filter: string) => void;
  onMoreFilters?: () => void;
  handleSearchChange?: (query: string) => void;
  activeFilters?: FilterPill[];
}

export function FiltersBar({
  onMoreFilters,
  handleSearchChange,
  activeFilters = [],
}: FiltersBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleSearchChange?.(value);
  };

  return (
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <div className="flex flex-wrap gap-2 items-center">
        {activeFilters.map((filter) => (
          <button
            key={filter.label}
            onClick={filter.onRemove}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition cursor-pointer"
          >
            {filter.label}
            <X className="h-4 w-4" />
          </button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={onMoreFilters}
          className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
        >
          <ListFilter className="h-4 w-4 mr-2" />
          More filters
        </Button>
      </div>

      <div className="w-full md:w-[40%]">
        <InputGroup className="border-gray-300 bg-white placeholder:text-gray-500 w-full">
          <InputGroupInput
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
          />
          <InputGroupAddon>
            <Search className="h-4 w-4 text-gray-500" />
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}
