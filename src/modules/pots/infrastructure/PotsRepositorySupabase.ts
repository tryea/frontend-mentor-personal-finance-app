import { SupabaseClient } from "@supabase/supabase-js";
import { PotsRepository } from "../domain/PotsRepository";
import { PotItem } from "@/shared/types/pots";

export function makePotsRepositorySupabase(
  client: SupabaseClient
): PotsRepository {
  return {
    async getPotsWithDetails(): Promise<PotItem[]> {
      const { data: userPotsWithDetails, error } = await client
        .from("pots_with_details")
        .select("*");

      if (error) {
        throw new Error(error.message);
      }

      return userPotsWithDetails;
    },
  };
}
