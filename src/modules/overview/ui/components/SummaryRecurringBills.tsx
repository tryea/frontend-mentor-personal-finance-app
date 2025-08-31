import React from "react";
import SummaryCard from "./SummaryCard";
import { IconPot } from "@/src/shared/ui/icons";

const SummaryRecurringBills = () => {
  const potsData = [
    { name: "Savings", amount: 159, colorTag: "#277c78" },
    { name: "Gift", amount: 40, colorTag: "#82c9d7" },
    { name: "Concert Ticket", amount: 110, colorTag: "#626070" },
    { name: "New Laptop", amount: 10, colorTag: "#f2cdac" },
  ];

  return (
    <SummaryCard title="Pots" onSeeDetailsClick={() => {}} className="gap-5">
      <div className="flex flex-row gap-5 flex-1 min-h-0 ">
        <div className="bg-beige-100 p-4 flex flex-row gap-4 w-[247px] h-[110px] items-center rounded-xl">
          <IconPot className="w-10 h-10 text-green-500" />
          <div className="flex flex-col gap-3">
            <p className="text-preset-4 text-grey-500">Total Saved</p>
            <p className="text-preset-1 text-grey-900">$850</p>
          </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[110px]">
          {potsData.map((pot, idx) => {
            return (
              <div
                key={`pot-${idx}`}
                className="flex flex-1 flex-row items-center gap-4"
              >
                <div
                  className={`rounded-lg h-full w-1 `}
                  style={{ backgroundColor: pot.colorTag }}
                />
                <div className="flex flex-col gap-2 flex-1">
                  <div className="text-preset-5 text-grey-500">{pot.name}</div>
                  <div className="text-preset-4-bold text-grey-900">
                    ${pot.amount}
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

export default SummaryRecurringBills;
