import React from "react";
import BalanceCard from "./BalanceCard";
import { useOverviewCtx } from "../context/OverviewProvider";

const BalanceSection = () => {
  const { data } = useOverviewCtx();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
      <BalanceCard
        title="Current Balance"
        value={data?.userCurrentBalance || 0}
        isDark
      />
      <BalanceCard title="Income" value={data?.userIncome || 0} />
      <BalanceCard title="Expenses" value={data?.userExpense || 0} />
    </div>
  );
};

export default BalanceSection;
