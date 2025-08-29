"use client";

import React from "react";
import Sidebar from "@/src/shared/ui/layout/Sidebar";
import {
  SidebarProvider,
  useSidebar,
} from "@/src/shared/contexts/SidebarContext";
import BottomNav from "@/src/shared/ui/layout/BottomNav";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isMinimized } = useSidebar();

  return (
    <div className="dashboard-layout" data-minimized={isMinimized}>
      <Sidebar />
      <main className="dashboard-content">{children}</main>
      <BottomNav />
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  );
}
