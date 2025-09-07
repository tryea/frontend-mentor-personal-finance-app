import { PotItem } from "@/shared/types/pots";
import { PotsRepository } from "../domain/PotsRepository";

export function makeGetPotsWithDetails(repo: PotsRepository) {
  return {
    execute(): Promise<PotItem[]> {
      return repo.getPotsWithDetails();
    },
  };
}
