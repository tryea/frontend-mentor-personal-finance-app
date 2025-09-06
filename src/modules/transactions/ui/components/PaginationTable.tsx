import { IconCaretLeft, IconCaretRight } from "@/shared/ui/icons";
import React, { useEffect, useRef, useState } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const [maxWidth, setMaxWidth] = useState<number>(0);
  const totalPages = Math.ceil(totalTransactions / pageSize);

  useEffect(() => {
    const updateMaxWidth = () => {
      if (containerRef.current && prevRef.current) {
        const width = containerRef.current.offsetWidth;
        const actionWidth = prevRef.current.offsetWidth;
        setMaxWidth(width - actionWidth * 2 - 36);
      }
    };

    updateMaxWidth();
    window.addEventListener("resize", updateMaxWidth);

    return () => {
      window.removeEventListener("resize", updateMaxWidth);
    };
  }, []);

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
    let widthLeft = maxWidth;
    let maxPageSize = 1;
    let pageNo = 1;

    while (widthLeft > 80) {
      maxPageSize++;
      widthLeft -= 44;
    }

    while (pageNo <= totalPages && pageNo < maxPageSize) {
      pageNumbers.push(pageNo++);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-[auto_1fr_auto] min-w-full max-w-full gap-3 shrink-0 min-h-0 h-[40px]"
    >
      <button
        ref={prevRef}
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="group transaction-table-pagination-button flex items-center justify-center gap-2 w-10 md:w-24"
      >
        <IconCaretLeft className="w-4 h-4 text-grey-500 group-hover:text-white" />
        <span className="hidden md:block">Prev</span>
      </button>

      <div className="flex flex-1 flex-row grow min-w-full min-h-0 h-full max-w-full overflow-hidden gap-2 justify-center">
        {totalTransactions === 1 && (
          <button
            key={`page-halu`}
            data-active={true}
            className={"transaction-table-pagination-button"}
          >
            {1}
          </button>
        )}
        {pageNumbers.map((page) => (
          <button
            key={`page-${page}`}
            onClick={() => onPageChange(page)}
            data-active={currentPage === page}
            className={"transaction-table-pagination-button w-10 h-10"}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="transaction-table-pagination-button group flex items-center justify-center gap-2 w-10 md:w-24"
      >
        <span className="hidden md:block">Next</span>
        <IconCaretRight className="w-4 h-4 text-grey-500 group-hover:text-white" />
      </button>
    </div>
  );
};
