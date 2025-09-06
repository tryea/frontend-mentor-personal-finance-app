// src/modules/overview/domain/OverviewRepository.ts
import { Overview } from "./types";

export interface OverviewRepository {
  getOverview(): Promise<Overview>;
}
