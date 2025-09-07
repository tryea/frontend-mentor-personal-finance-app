"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePots } from "../hooks/usePots";
import { PotItem } from "@/shared/types/pots";

type Ctx = { 
  data: PotItem[] | null; 
  loading: boolean; 
  error: string | null;
  setPots: (updater: (prev: PotItem[]) => PotItem[]) => void;
};
const PotsCtx = createContext<Ctx | null>(null);

export function PotsProvider({ children }: { children: React.ReactNode }) {
  const { data: fetchedData, loading, error } = usePots();
  const [localData, setLocalData] = useState<PotItem[] | null>(null);
  
  // Update local data when fetched data changes
  useEffect(() => {
    if (fetchedData) {
      setLocalData(fetchedData);
    }
  }, [fetchedData]);
  
  // Use local data if available, otherwise use fetched data
  const data = localData || fetchedData;
  
  const setPots = (updater: (prev: PotItem[]) => PotItem[]) => {
    setLocalData((prev) => {
      const currentData = prev || [];
      return updater(currentData);
    });
  };
  
  const value = { data, loading, error, setPots };
  return <PotsCtx.Provider value={value}>{children}</PotsCtx.Provider>;
}

export function usePotsCtx() {
  const ctx = useContext(PotsCtx);
  if (!ctx) throw new Error("usePotsCtx must be used within PotsProvider");
  return ctx;
}
