import { IconCaretLeft, IconCaretRight } from "@/shared/ui/icons";
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
    <div className="flex flex-row w-full gap-3 max-w-full items-center justify-between shrink-0 min-h-0 h-[40px]">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="group transaction-table-pagination-button flex-none"
      >
        <IconCaretLeft className="w-4 h-4 text-grey-500 group-hover:text-white" />
        <span className="hidden md:block">Prev</span>
      </button>

      <div className="flex flex-1 flex-row min-w-0 overflow-x-auto whitespace-nowrap items-center justify-center gap-2">
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            data-active={currentPage === page}
            className={"transaction-table-pagination-button"}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="transaction-table-pagination-button group flex-none"
      >
        <span className="hidden md:block">Next</span>
        <IconCaretRight className="w-4 h-4 text-grey-500 group-hover:text-white" />
      </button>
    </div>
  );
};
