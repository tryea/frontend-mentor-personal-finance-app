"use client";

import { useState, useMemo, useEffect } from "react";
import { DataTable } from "./DataTable";
import { FilterAndSearchTable } from "./FilterAndSearchTable";
import { PaginationTable } from "./PaginationTable";
import { useSupabaseClient } from "@/shared/hooks/useSupabaseClient";
import { TransactionItemTable } from "@/shared/types/transaction";
import { Categories } from "@/shared/types/categories";

const SORT_BY = ["Latest", "Oldest", "A to Z", "Z to A", "Highest", "Lowest"];

export const TransactionTable = () => {
  const supabase = useSupabaseClient();

  const [transactions, setTransactions] = useState<TransactionItemTable[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(1);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [sortBy, setSortBy] = useState(SORT_BY[0]);
  const pageSize = 10;

  const fetchTransactions = async () => {
    if (!supabase) return;

    let sortColumn = "transaction_date";
    let sortOrder = "desc";
    let referencedTable = undefined;
    if (sortBy === "Oldest") {
      sortOrder = "asc";
    }

    if (sortBy === "A to Z") {
      sortColumn = "name";
      sortOrder = "asc";
      referencedTable = "contacts";
    }

    if (sortBy === "Z to A") {
      sortColumn = "name";
      sortOrder = "desc";
      referencedTable = "contacts";
    }

    if (sortBy === "Highest") {
      sortColumn = "amount";
      sortOrder = "desc";
    }

    if (sortBy === "Lowest") {
      sortColumn = "amount";
      sortOrder = "asc";
    }

    const {
      data: transactions,
      error,
      count,
    } = await supabase
      .from("transactions")
      .select(
        `
          id,
          contacts!inner (
            name,
            avatar: avatar_url
          ),
          categories ( name ),
          amount,
          type,
          date: transaction_date,
          recurring: is_recurring
        `,
        {
          count: "estimated",
        }
      )
      .order(sortColumn, {
        ascending: sortOrder === "asc",
        referencedTable: referencedTable,
      })
      .filter(
        "category_id",
        currentCategory === "all" ? "gt" : "eq",
        currentCategory === "all" ? 0 : currentCategory
      )
      .filter("contacts.name", "ilike", `%${searchQuery}%`)
      .range(pageSize * (currentPage - 1), pageSize * currentPage - 1)
      .overrideTypes<Array<TransactionItemTable>>();

    if (error) {
      console.error("Error fetching transactions:", error);
      return;
    }

    console.log({ transactions, count });
    setTotalData(count || 0);
    setTransactions(transactions);
  };

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
  };

  const handleCategoryChange = (categoryId: string) => {
    setCurrentCategory(categoryId);
  };

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    fetchTransactions();
  }, [sortBy, currentCategory, searchQuery, currentPage]);

  useEffect(() => {
    fetchTransactions();
    async function fetchCategories() {
      if (!supabase) return;

      const { data: categories, error } = await supabase
        .from("categories")
        .select("id, name")
        .overrideTypes<Categories[]>();

      if (error) {
        console.error("Error fetching categories:", error);
        return;
      }

      setCategories(categories);
    }

    fetchCategories();
  }, [supabase]);

  return (
    <div className="px-5 py-6 rounded-xl bg-white flex flex-1 flex-col gap-6 md:p-8 min-h-0 max-h-full overflow-hidden">
      <FilterAndSearchTable
        sortOptions={SORT_BY}
        onSortChange={handleSortChange}
        categories={categories}
        onChangeCategory={handleCategoryChange}
        onSearchQueryChange={handleSearchQueryChange}
      />
      <DataTable transactions={transactions} />
      <PaginationTable
        currentPage={currentPage}
        pageSize={pageSize}
        totalTransactions={totalData}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
