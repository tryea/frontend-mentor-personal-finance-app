import React, { useState, useEffect, useMemo } from "react";
import SummaryCard from "./SummaryCard";
import dataJson from "../../../../../data.json";
import TransactionsList, { TransactionListItem } from "./TransactionsList";
import { redirect } from "next/navigation";
import { dashboardService } from "../../../dashboard/services/dashboardService";
import { Transaction } from "../../../dashboard/domain/types";

const SummaryTransactionCard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await dashboardService.getOverview();
        setTransactions(data.transactions);
      } catch (err: any) {
        setError(err.message || "Failed to fetch transactions data");
        // Fallback to mock data on error
        setTransactions(dataJson.transactions as Transaction[]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const latestFive = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return [];
    }
    const list = transactions.slice();
    list.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return list.slice(0, 5).map<TransactionListItem>((t) => ({
      avatar: t.avatar,
      name: t.name,
      date: t.date,
      amount: t.amount,
    }));
  }, [transactions]);

  return (
    <SummaryCard
      title="Transactions"
      actionLabel="View All"
      onSeeDetailsClick={() => {
        redirect("/transactions");
      }}
      className="gap-5"
    >
      <TransactionsList items={latestFive} />
    </SummaryCard>
  );
};

export default SummaryTransactionCard;
