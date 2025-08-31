import React from "react";
import SummaryPotsCard from "./SummaryPotsCard";
import SummaryBudgetsCard from "./SummaryBudgetsCard";
import SummaryTransactionCard from "./SummaryTransactionCard";
import SummaryRecurringBills from "./SummaryRecurringBills";

const SummaryList = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[608px_1fr] gap-6">
      <SummaryPotsCard />
      <SummaryBudgetsCard />
      <SummaryTransactionCard />
      <SummaryRecurringBills />
    </div>
  );
};

export default SummaryList;
