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
    <div
      className={`min-h-dvh max-h-dvh grid transition-[grid-template-columns] duration-200 ease-out overflow-hidden`}
      style={{
        gridTemplateColumns: isMinimized ? "80px 1fr" : "300px 1fr",
      }}
    >
      <aside className="h-full w-full hidden lg:block">
        <Sidebar />
      </aside>
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
