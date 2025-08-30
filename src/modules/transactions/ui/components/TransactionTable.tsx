"use client";

import { useState, useMemo, useEffect } from "react";
import { DataTable } from "./DataTable";
import { FilterAndSearchTable } from "./FilterAndSearchTable";
import { PaginationTable } from "./PaginationTable";
import data from "../../../../../data.json";

export const TransactionTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return data.transactions.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pageSize]);

  const totalTransactions = data.transactions.length;

  return (
    <div className="px-5 py-6 rounded-xl bg-white flex flex-1 flex-col gap-6 md:p-8 min-h-0 max-h-full overflow-hidden">
      <FilterAndSearchTable />
      <DataTable transactions={currentTableData} />
      <PaginationTable
        currentPage={currentPage}
        pageSize={pageSize}
        totalTransactions={totalTransactions}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
