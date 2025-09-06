import { LayoutHeader } from "@/shared/ui/primitives/LayoutHeader";
import React from "react";
import BalanceSection from "./components/BalanceSection";
import SummaryList from "./components/SummaryList";
import { useOverviewCtx } from "./context/OverviewProvider";

const OverviewScreen = () => {
  const { data, loading, error } = useOverviewCtx();

  if (loading) return <div className="p-6">Loading…</div>;
  if (error || !data)
    return <div className="p-6 text-red-600">{error ?? "No data"}</div>;

  return (
    <>
      <LayoutHeader title="Overview" />
      <BalanceSection />
      <SummaryList />
    </>
  );
};

export default OverviewScreen;
