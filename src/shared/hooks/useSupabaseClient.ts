"use client";

import { useEffect, useState } from "react";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { useSession } from "@clerk/nextjs";

export const useSupabaseClient = () => {
  const { session } = useSession();
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);

  useEffect(() => {
    if (!session) {
      setSupabase(null);
      return;
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase environment variables");
      return;
    }

    const client = createClient(supabaseUrl, supabaseKey, {
      accessToken: async () => {
        const token = await session.getToken();
        return token || "";
      },
    });

    setSupabase(client);
  }, [session]);

  return supabase;
};
