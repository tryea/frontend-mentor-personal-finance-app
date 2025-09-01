import { LayoutHeader } from "@/src/shared/ui/primitives/LayoutHeader";
import React from "react";
import BalanceSection from "./components/BalanceSection";
import SummaryList from "./components/SummaryList";

const OverviewScreen = () => {
  return (
    <>
      <LayoutHeader title="Overview" />
      <BalanceSection />
      <SummaryList />
    </>
  );
};

export default OverviewScreen;
