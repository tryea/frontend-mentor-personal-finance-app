import React from "react";
import SummaryCard from "./SummaryCard";
import ChartDonut from "@/src/shared/ui/primitives/ChartDonut";

const SummaryBudgetsCard = () => {
  const budgetData = [
    { name: "Entertainment", spent: 50, maximum: 1000, color: "#277c78" },
    { name: "Bills", spent: 750, maximum: 1000, color: "#82c9d7" },
    { name: "Dining Out", spent: 75, maximum: 1000, color: "#f2cdac" },
    { name: "Personal Care", spent: 100, maximum: 1000, color: "#626070" },
  ];

  return (
    <SummaryCard title="Budgets" onSeeDetailsClick={() => {}} className="gap-5">
      <div className="flex flex-row gap-5 flex-1 min-h-0 ">
        <ChartDonut items={budgetData} total={{ spent: 159, maximum: 1000 }} />
        <div className="flex flex-col gap-4">
          {budgetData.map((pot, idx) => {
            return (
              <div
                key={`budget-${idx}`}
                className="flex flex-1 flex-row items-center gap-4"
              >
                <div
                  className={`rounded-lg h-full w-1 `}
                  style={{ backgroundColor: pot.color }}
                />
                <div className="flex flex-col gap-2 flex-1">
                  <div className="text-preset-5 text-grey-500">{pot.name}</div>
                  <div className="text-preset-4-bold text-grey-900">
                    ${pot.spent}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SummaryCard>
  );
};

export default SummaryBudgetsCard;
