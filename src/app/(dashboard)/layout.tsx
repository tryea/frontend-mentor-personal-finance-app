"use client";

import React from "react";
import Sidebar from "@/src/shared/ui/layout/Sidebar";
import {
  SidebarProvider,
  useSidebar,
} from "@/src/shared/contexts/SidebarContext";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isMinimized } = useSidebar();

  return (
    <div
      className={`min-h-dvh grid ${
        isMinimized ? "md:grid-cols-[80px_1fr]" : "md:grid-cols-[300px_1fr]"
      }`}
    >
      <aside className="w-full">
        <Sidebar />
      </aside>
      <main className="p-6">{children}</main>
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
