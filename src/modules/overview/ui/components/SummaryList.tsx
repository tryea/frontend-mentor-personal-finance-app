import React from "react";
import SummaryPotsCard from "./SummaryPotsCard";
import SummaryBudgetsCard from "./SummaryBudgetsCard";
import SummaryTransactionCard from "./SummaryTransactionCard";
import SummaryRecurringBills from "./SummaryRecurringBills";

const SummaryList = () => {
  return (
    <div className="grid grid-cols-1 min-[1450px]:grid-cols-[608px_1fr] gap-6 min-[1450px]:h-fit min-[1450px]:overflow-y-scroll min-[1450px]:overscroll-none min-[1450px]:min-h-0">
      {/* Left Column - Desktop */}
      <div className="flex flex-col min-h-0 h-full gap-4 md:gap-6">
        {/* Pots (mobile order 1, desktop order 1) */}
        <div className="order-1 min-h-0 h-fit">
          <SummaryPotsCard />
        </div>
        {/* Transactions (mobile order 2, desktop order 2) */}
        <div className="order-2 lg:flex-1 min-h-0 h-fit">
          <SummaryTransactionCard />
        </div>
      </div>

      {/* Right Column - Desktop */}
      <div className="flex flex-col min-h-0 h-full gap-4 md:gap-6">
        {/* Budgets (mobile order 3, desktop order 1) */}
        <div className="order-3 lg:order-none min-h-0 h-fit">
          <SummaryBudgetsCard />
        </div>
        {/* Recurring Bills (mobile order 4, desktop order 2) */}
        <div className="order-4 lg:order-none lg:flex-1 min-h-0 h-fit">
          <SummaryRecurringBills />
        </div>
      </div>
    </div>
  );
};

export default SummaryList;
