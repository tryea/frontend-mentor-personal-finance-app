// src/modules/overview/ui/hooks/useOverview.ts
"use client";
import { useEffect, useState } from "react";
import { useSupabaseClient } from "@/shared/hooks/useSupabaseClient";
import { makeOverviewRepositorySupabase } from "../../infrastructure/OverviewRepositorySupabase";
import { makeGetOverview } from "../../application/GetOverview";
import { Overview } from "../../domain/types";

export function useOverview() {
  const supabase = useSupabaseClient();

  const [data, setData] = useState<Overview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;

    const repo = makeOverviewRepositorySupabase(supabase);
    const getOverview = makeGetOverview(repo);

    setLoading(true);
    getOverview
      .execute()
      .then(setData)
      .catch((e) => setError(e.message ?? "Failed to load overview"))
      .finally(() => setLoading(false));
  }, [supabase]);

  return { data, loading, error };
}
