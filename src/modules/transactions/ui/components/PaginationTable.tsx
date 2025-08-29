import { IconCaretLeft, IconCaretRight } from "@/src/shared/ui/icons";
import React from "react";

interface PaginationTableProps {
  currentPage: number;
  pageSize: number;
  totalTransactions: number;
  onPageChange: (page: number) => void;
}

export const PaginationTable = ({
  currentPage,
  pageSize,
  totalTransactions,
  onPageChange,
}: PaginationTableProps) => {
  const totalPages = Math.ceil(totalTransactions / pageSize);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      if (currentPage < 4) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage > totalPages - 3) {
        startPage = totalPages - 4;
        endPage = totalPages;
      }
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-between">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="h-10 w-10 flex items-center justify-center rounded-lg border border-grey-500 bg-white text-preset-4 text-grey-900 hover:bg-grey-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <IconCaretLeft className="w-4 h-4 text-grey-500" />
      </button>

      <div className="flex items-center gap-2">
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex h-10 w-10 items-center justify-center rounded-lg border text-preset-4 ${
              currentPage === page
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="h-10 w-10 flex items-center justify-center rounded-lg border border-grey-500 bg-white text-preset-4 text-grey-900 hover:bg-grey-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <IconCaretRight className="w-4 h-4 text-grey-500" />
      </button>
    </div>
  );
};
