import React, { useState, useEffect } from "react";
import BalanceCard from "./BalanceCard";
import { dashboardService } from "../../../dashboard/services/dashboardService";
import { Balance } from "../../../dashboard/domain/types";

const BalanceSection = () => {
  const [balance, setBalance] = useState<Balance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await dashboardService.getOverview();
        setBalance(data.balance);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch balance data');
        // Fallback to mock data on error
        setBalance({
          current: 4836.00,
          income: 3814.25,
          expenses: 1700.50
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
        <BalanceCard title="Current Balance" value={0} isDark />
        <BalanceCard title="Income" value={0} />
        <BalanceCard title="Expenses" value={0} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
      <BalanceCard 
        title="Current Balance" 
        value={balance?.current || 0} 
        isDark 
      />
      <BalanceCard 
        title="Income" 
        value={balance?.income || 0} 
      />
      <BalanceCard 
        title="Expenses" 
        value={balance?.expenses || 0} 
      />
    </div>
  );
};

export default BalanceSection;
