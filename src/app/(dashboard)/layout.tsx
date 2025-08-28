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
      className={`min-h-dvh grid transition-[grid-template-columns] duration-200 ease-out`}
      style={{
        gridTemplateColumns: isMinimized ? "80px 1fr" : "300px 1fr",
      }}
    >
      <aside className="w-full hidden md:block">
        <Sidebar />
      </aside>
      <main className="p-6 pb-20 md:pb-6">{children}</main>
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
