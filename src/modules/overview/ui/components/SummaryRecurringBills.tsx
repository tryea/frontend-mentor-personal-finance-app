import React from "react";
import SummaryCard from "./SummaryCard";
import { redirect } from "next/navigation";
import { useOverviewCtx } from "../context/OverviewProvider";
import { currencyFormatter } from "@/shared/utils/formatter";

const SummaryRecurringBills = () => {
  const { data } = useOverviewCtx();

  return (
    <SummaryCard
      title="Recurring Bills"
      onSeeDetailsClick={() => {
        redirect("/recurring-bills");
      }}
      className="gap-8"
    >
      <div className="flex flex-row gap-5 flex-1 min-h-0 h-full">
        <div className="grid grid-cols-1 grid-rows-3 gap-4 flex-1">
          <Row
            label="Paid Bills"
            value={currencyFormatter(data?.recurringTotalPaid || 0)}
            color={"#277c78"}
          />
          <Row
            label="Total Upcoming"
            value={currencyFormatter(data?.recurringTotalUpcoming || 0)}
            color={"#f2cdac"}
          />
          <Row
            label="Due Soon"
            value={currencyFormatter(data?.recurringTotalDueSoon || 0)}
            color={"#82c9d7"}
          />
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
