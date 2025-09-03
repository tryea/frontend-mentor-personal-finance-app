import React from "react";
import SummaryCard from "./SummaryCard";
import ChartDonut from "@/shared/ui/primitives/ChartDonut";
import { redirect } from "next/navigation";

const SummaryBudgetsCard = () => {
  const budgetData = [
    {
      name: "Entertainment",
      spent: 50,
      maximum: 1000,
      color: "var(--color-green-500)",
    },
    {
      name: "Bills",
      spent: 750,
      maximum: 1000,
      color: "var(--color-cyan-500)",
    },
    {
      name: "Dining Out",
      spent: 75,
      maximum: 1000,
      color: "var(--color-yellow-500)",
    },
    {
      name: "Personal Care",
      spent: 100,
      maximum: 1000,
      color: "var(--color-navy-500)",
    },
  ];

  return (
    <SummaryCard
      title="Budgets"
      onSeeDetailsClick={() => {
        redirect("/budgets");
      }}
      className="gap-8"
    >
      <div className="flex flex-col gap-4 md:flex-row md:gap-5 flex-1 min-h-0 ">
        <div className="flex flex-1 min-w-0 grow items-center justify-center">
          <ChartDonut
            items={budgetData}
            total={{ spent: 159, maximum: 1000 }}
          />
        </div>
        <div className="flex flex-col shrink-0">
          <div className="w-full grid grid-cols-2 md:grid-cols-1 gap-4">
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
                    <div className="text-preset-5 text-grey-500">
                      {pot.name}
                    </div>
                    <div className="text-preset-4-bold text-grey-900">
                      ${pot.spent}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SummaryCard>
  );
};

export default SummaryBudgetsCard;
