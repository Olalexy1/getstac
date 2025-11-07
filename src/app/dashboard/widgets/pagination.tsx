"use client";

import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious?: () => void;
  onNext?: () => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="border-[#B6C8BD] text-[#222822] text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent font-medium"
      >
        Previous
      </Button>

      <p className="text-sm text-[#222822] font-medium">
        Page {currentPage} of {totalPages}
      </p>

      <Button
        variant="outline"
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="border-[#B6C8BD] text-[#222822] text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent font-medium"
      >
        Next
      </Button>
    </div>
  );
}
