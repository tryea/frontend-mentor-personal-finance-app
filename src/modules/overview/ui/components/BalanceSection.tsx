import React from "react";
import BalanceCard from "./BalanceCard";

const BalanceSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
      <BalanceCard title="Current Balance" value={1000000} isDark />
      <BalanceCard title="Income" value={1000000} />
      <BalanceCard title="Expenses" value={1000000} />
    </div>
  );
};

export default BalanceSection;
