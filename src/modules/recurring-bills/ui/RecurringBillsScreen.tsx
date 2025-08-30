'use client'
import { useMemo, useState } from "react";
import { LayoutHeader } from "@/src/shared/ui/primitives/LayoutHeader";
import data from "../../../../data.json";
import { RecurringBillsHeader } from "./components/RecurringBillsHeader";
import { RecurringBillsFilter } from "./components/RecurringBillsFilter";
import { RecurringBillList } from "./components/RecurringBillList";

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

const toCurrency = (n: number) => `$${n.toFixed(2)}`;

const addMonths = (date: Date, months: number) => {
  const d = new Date(date.getTime());
  d.setMonth(d.getMonth() + months);
  return d;
};

const monthDiff = (a: Date, b: Date) => a.getFullYear() * 12 + a.getMonth() - (b.getFullYear() * 12 + b.getMonth());

export const RecurringBillsScreen = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "oldest">("latest");

  const recurring = (data.transactions as Transaction[]).filter((t) => t.recurring);

  const grouped = useMemo<BillItem[]>(() => {
    const map = new Map<string, BillItem>();
    for (const t of recurring) {
      const key = t.name;
      const amount = Math.abs(t.amount);
      const d = new Date(t.date);
      const existing = map.get(key);
      if (!existing || d > existing.latestDate) {
        map.set(key, {
          name: t.name,
          avatar: t.avatar,
          category: t.category,
          amount,
          latestDate: d,
          nextDueDate: addMonths(d, 1),
        });
      }
    }
    return Array.from(map.values());
  }, [recurring]);

  const totals = useMemo(() => {
    const now = new Date();
    const total = grouped.reduce((acc, it) => acc + it.amount, 0);
    const paid = grouped
      .filter((it) => monthDiff(now, it.latestDate) === 0)
      .reduce((acc, it) => acc + it.amount, 0);
    const upcoming = grouped
      .filter((it) => it.nextDueDate > now && monthDiff(it.nextDueDate, now) === 0)
      .reduce((acc, it) => acc + it.amount, 0);
    const dueSoon = grouped
      .filter((it) => {
        const diff = (it.nextDueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
        return diff >= 0 && diff <= 7;
      })
      .reduce((acc, it) => acc + it.amount, 0);
    return { total, paid, upcoming, dueSoon };
  }, [grouped]);

  const filteredSorted = useMemo(() => {
    const list = grouped.filter((it) => it.name.toLowerCase().includes(search.toLowerCase()));
    return list.sort((a, b) =>
      sortBy === "latest" ? b.latestDate.getTime() - a.latestDate.getTime() : a.latestDate.getTime() - b.latestDate.getTime()
    );
  }, [grouped, search, sortBy]);

  return (
    <>
      <LayoutHeader title="Recurring Bills" actionName="Add New Bill" />
      <div className="stack-6">
        <RecurringBillsHeader
          total={totals.total}
          paid={totals.paid}
          upcoming={totals.upcoming}
          dueSoon={totals.dueSoon}
        />
        <RecurringBillsFilter search={search} sortBy={sortBy} onSearch={setSearch} onSort={setSortBy} />
        <RecurringBillList items={filteredSorted} toCurrency={toCurrency} />
      </div>
    </>
  );
};

export default RecurringBillsScreen;