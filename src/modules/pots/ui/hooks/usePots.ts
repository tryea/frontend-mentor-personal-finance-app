"use client";

import { useEffect, useState } from "react";
import { useSupabaseClient } from "@/shared/hooks/useSupabaseClient";
import { PotItem } from "@/shared/types/pots";
import { makePotsRepositorySupabase } from "../../infrastructure/PotsRepositorySupabase";
import { makeGetPotsWithDetails } from "../../application/GetPotsWithDetails";

export function usePots() {
  const supabase = useSupabaseClient();

  const [data, setData] = useState<PotItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;

    const repo = makePotsRepositorySupabase(supabase);
    const getPots = makeGetPotsWithDetails(repo);

    setLoading(true);
    getPots
      .execute()
      .then(setData)
      .catch((e) => setError(e.message ?? "Failed to load pots"))
      .finally(() => setLoading(false));
  }, [supabase]);

  return { data, loading, error };
}
