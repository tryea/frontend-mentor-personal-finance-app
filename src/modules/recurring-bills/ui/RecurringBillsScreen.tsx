"use client";
import { useEffect, useState } from "react";
import { LayoutHeader } from "@/shared/ui/primitives/LayoutHeader";
import { RecurringBillsHeader } from "./components/RecurringBillsHeader";
import { RecurringBillsFilter } from "./components/RecurringBillsFilter";
import { RecurringBillList } from "./components/RecurringBillList";
import { useSupabaseClient } from "@/shared/hooks/useSupabaseClient";
import {
  RecurringItemList,
  RecurringSummary,
} from "@/shared/types/recurringBill";

export type Transaction = {
  avatar?: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
};

export type BillItem = {
  name: string;
  avatar?: string;
  category: string;
  amount: number;
  latestDate: Date;
  nextDueDate: Date;
};

const SORT_BY = ["Latest", "Oldest", "A to Z", "Z to A", "Highest", "Lowest"];

export const RecurringBillsScreen = () => {
  const supabase = useSupabaseClient();
  const [recurringSummary, setRecurringSummary] =
    useState<RecurringSummary | null>(null);

  const [recurringList, setRecurringList] = useState<RecurringItemList[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [sortBy, setSortBy] = useState(SORT_BY[0]);

  const fetchSummaryRecurringBills = async () => {
    if (!supabase) return;

    const { data, error } = await supabase
      .from("recurring_summary")
      .select("*")
      .single();

    if (error) {
      console.error("Error fetching transactions:", error);
      return;
    }

    setRecurringSummary(data);
  };

  const fetchRecurringBills = async () => {
    if (!supabase) return;

    let sortColumn = "dueDate";
    let sortOrder = "asc";

    if (sortBy === "Oldest") {
      sortOrder = "asc";
    }

    if (sortBy === "A to Z") {
      sortColumn = "contactName";
      sortOrder = "asc";
    }

    if (sortBy === "Z to A") {
      sortColumn = "contactName";
      sortOrder = "desc";
    }

    if (sortBy === "Highest") {
      sortColumn = "amount";
      sortOrder = "desc";
    }

    if (sortBy === "Lowest") {
      sortColumn = "amount";
      sortOrder = "asc";
    }

    const { data, error } = await supabase
      .from("recurring_bills")
      .select("*")
      .order(sortColumn, {
        ascending: sortOrder === "asc",
      })
      .filter("contactName", "ilike", `%${searchQuery}%`);

    if (error) {
      console.error("Error fetching transactions:", error);
      return;
    }

    setRecurringList(data);
  };

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
  };

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    fetchSummaryRecurringBills();
    fetchRecurringBills();
  }, [supabase]);

  useEffect(() => {
    fetchRecurringBills();
  }, [sortBy, searchQuery]);

  return (
    <>
      <LayoutHeader title="Recurring Bills" actionName="Add New Bill" />
      <div className="stack-6">
        <RecurringBillsHeader summary={recurringSummary} />
        <RecurringBillsFilter
          sortOptions={SORT_BY}
          onSortChange={handleSortChange}
          onSearchQueryChange={handleSearchQueryChange}
        />
        <RecurringBillList items={recurringList} />
      </div>
    </>
  );
};

export default RecurringBillsScreen;
