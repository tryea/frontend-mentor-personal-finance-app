import { PotItem } from "@/shared/types/pots";

export interface PotsRepository {
  getPotsWithDetails(): Promise<PotItem[]>;
}
