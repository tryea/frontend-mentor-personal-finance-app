import React, { useMemo } from "react";
import SummaryCard from "./SummaryCard";
import dataJson from "../../../../../data.json";
import TransactionsList, { TransactionListItem } from "./TransactionsList";
import { redirect } from "next/navigation";

type Transaction = {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
};

const SummaryTransactionCard = () => {
  const latestFive = useMemo(() => {
    const list = (dataJson.transactions as Transaction[]).slice();
    list.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return list.slice(0, 5).map<TransactionListItem>((t) => ({
      avatar: t.avatar,
      name: t.name,
      date: t.date,
      amount: t.amount,
    }));
  }, []);

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
