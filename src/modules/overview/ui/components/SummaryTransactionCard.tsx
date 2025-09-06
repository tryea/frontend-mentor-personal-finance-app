import React from "react";
import SummaryCard from "./SummaryCard";
import TransactionsList from "./TransactionsList";
import { redirect } from "next/navigation";
import { useOverviewCtx } from "../context/OverviewProvider";

const SummaryTransactionCard = () => {
  const { data } = useOverviewCtx();

  return (
    <SummaryCard
      title="Transactions"
      actionLabel="View All"
      onSeeDetailsClick={() => {
        redirect("/transactions");
      }}
      className="gap-8"
    >
      <TransactionsList items={data?.latest5Transactions || []} />
    </SummaryCard>
  );
};

export default SummaryTransactionCard;
