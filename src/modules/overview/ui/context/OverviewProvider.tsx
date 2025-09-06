"use client";
import { createContext, useContext } from "react";
import { useOverview } from "../hooks/useOverview";
import { Overview } from "../../domain/types";

type Ctx = { data: Overview | null; loading: boolean; error: string | null };
const OverviewCtx = createContext<Ctx | null>(null);

export function OverviewProvider({ children }: { children: React.ReactNode }) {
  const value = useOverview();
  return <OverviewCtx.Provider value={value}>{children}</OverviewCtx.Provider>;
}

export function useOverviewCtx() {
  const ctx = useContext(OverviewCtx);
  if (!ctx)
    throw new Error("useOverviewCtx must be used within OverviewProvider");
  return ctx;
}
