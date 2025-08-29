"use client";

import { useState, useMemo, useEffect } from "react";
import { DataTable } from "./DataTable";
import { FilterAndSearchTable } from "./FilterAndSearchTable";
import { PaginationTable } from "./PaginationTable";
import data from "../../../../../data.json";

export const TransactionTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  useEffect(() => {
    const calculatePageSize = () => {
      const rowHeight = 65;
      const tableHeaderHeight = 60;
      const filterSearchHeight = 70;
      const paginationHeight = 60;
      const pageHeaderHeight = 100;
      const navBarHeight = 80;
      const verticalPadding = 40;

      const availableHeight =
        window.innerHeight -
        tableHeaderHeight -
        filterSearchHeight -
        paginationHeight -
        pageHeaderHeight -
        navBarHeight -
        verticalPadding;
      const idealPageSize = Math.floor(availableHeight / rowHeight);

      setPageSize(idealPageSize);
    };

    calculatePageSize();
    window.addEventListener("resize", calculatePageSize);

    return () => window.removeEventListener("resize", calculatePageSize);
  }, []);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return data.transactions.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pageSize]);

  const totalTransactions = data.transactions.length;

  return (
    <div className="px-5 py-6 rounded-xl bg-white flex flex-col gap-6 md:p-8">
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
