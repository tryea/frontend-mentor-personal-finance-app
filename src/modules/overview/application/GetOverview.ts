// src/modules/overview/application/GetOverview.ts
import { OverviewRepository } from "../domain/OverviewRepository";
import { Overview } from "../domain/types";

export function makeGetOverview(repo: OverviewRepository) {
  return {
    execute(): Promise<Overview> {
      return repo.getOverview();
    },
  };
}
