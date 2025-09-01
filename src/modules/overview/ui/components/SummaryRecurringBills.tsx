import React, { useMemo } from "react";
import SummaryCard from "./SummaryCard";
import dataJson from "../../../../../data.json";
import { redirect } from "next/navigation";

type Transaction = {
  avatar?: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
};

const toCurrency = (n: number) => `$${n.toFixed(2)}`;

const SummaryRecurringBills = () => {
  const { paid, upcoming, dueSoon, total } = useMemo(() => {
    const now = new Date();
    const recurring = (dataJson.transactions as Transaction[]).filter(
      (t) => t.recurring
    );

    const addMonths = (d: Date, months: number) => {
      const x = new Date(d.getTime());
      x.setMonth(x.getMonth() + months);
      return x;
    };
    const monthDiff = (a: Date, b: Date) =>
      a.getFullYear() * 12 +
      a.getMonth() -
      (b.getFullYear() * 12 + b.getMonth());

    // Group by name, keep latest date and amount
    const map = new Map<
      string,
      { amount: number; latestDate: Date; nextDueDate: Date }
    >();
    for (const t of recurring) {
      const d = new Date(t.date);
      const existing = map.get(t.name);
      if (!existing || d > existing.latestDate) {
        const amount = Math.abs(t.amount);
        map.set(t.name, {
          amount,
          latestDate: d,
          nextDueDate: addMonths(d, 1),
        });
      }
    }

    const list = Array.from(map.values());

    const total = list.reduce((acc, it) => acc + it.amount, 0);
    const paid = list
      .filter((it) => monthDiff(now, it.latestDate) === 0)
      .reduce((acc, it) => acc + it.amount, 0);
    const upcoming = list
      .filter(
        (it) => it.nextDueDate > now && monthDiff(it.nextDueDate, now) === 0
      )
      .reduce((acc, it) => acc + it.amount, 0);
    const dueSoon = list
      .filter((it) => {
        const diff =
          (it.nextDueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
        return diff >= 0 && diff <= 7;
      })
      .reduce((acc, it) => acc + it.amount, 0);

    return { paid, upcoming, dueSoon, total };
  }, []);

  return (
    <SummaryCard
      title="Recurring Bills"
      onSeeDetailsClick={() => {
        redirect("/recurring-bills");
      }}
      className="gap-8"
    >
      <div className="flex flex-row gap-5 flex-1 min-h-0 ">
        <div className="grid grid-cols-1 grid-rows-3 gap-4 flex-1">
          <Row label="Paid Bills" value={toCurrency(paid)} color={"#277c78"} />
          <Row
            label="Total Upcoming"
            value={toCurrency(upcoming)}
            color={"#f2cdac"}
          />
          <Row label="Due Soon" value={toCurrency(dueSoon)} color={"#82c9d7"} />
        </div>
      </div>
    </SummaryCard>
  );
};

const Row = ({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) => (
  <div className="relative flex items-center justify-between px-4 py-5 bg-beige-100 rounded-lg">
    <div
      className="absolute h-full top-0 left-0 w-1 rounded-l-lg"
      style={{ backgroundColor: color }}
    />
    <span className={`text-preset-4 text-grey-500`}>{label}</span>
    <span className={`text-preset-4-bold text-grey-900`}>{value}</span>
  </div>
);

export default SummaryRecurringBills;
