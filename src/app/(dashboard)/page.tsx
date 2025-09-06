"use client";

import { OverviewProvider } from "@/modules/overview/ui/context/OverviewProvider";
import OverviewScreen from "@/modules/overview/ui/OverviewScreen";
import React from "react";

export default function DashboardPage() {
  return (
    <OverviewProvider>
      <OverviewScreen />
    </OverviewProvider>
  );
}
