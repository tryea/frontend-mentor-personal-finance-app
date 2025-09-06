import React from "react";
import SummaryCard from "./SummaryCard";
import { IconPot } from "@/shared/ui/icons";
import { redirect, RedirectType } from "next/navigation";
import { useOverviewCtx } from "../context/OverviewProvider";
import { currencyFormatter } from "@/shared/utils/formatter";

const SummaryPotsCard = () => {
  const { data } = useOverviewCtx();

  return (
    <SummaryCard
      title="Pots"
      onSeeDetailsClick={() => {
        redirect("/pots", RedirectType.push);
      }}
      className="gap-5"
    >
      <div className="flex flex-col md:flex-row gap-5 flex-1 min-h-0 ">
        <div className="bg-beige-100 p-4 flex flex-row gap-4 w-full md:w-[247px] h-[110px] items-center rounded-xl shrink-0">
          <IconPot className="w-10 h-10 text-green-500" />
          <div className="flex flex-col gap-3">
            <p className="text-preset-4 text-grey-500">Total Saved</p>
            <p className="text-preset-1 text-grey-900">
              {currencyFormatter(data?.totalPotSaved || 0)}
            </p>
          </div>
        </div>
        <div className="flex flex-1 min-w-0 grow">
          <div className="grid grid-cols-2 gap-4 h-[110px] w-full">
            {data?.latest4Pots.map((pot) => {
              return (
                <div
                  key={`pot-${pot.id}`}
                  className="flex flex-1 flex-row items-center gap-4"
                >
                  <div
                    className={`rounded-lg h-full w-1 `}
                    style={{ backgroundColor: pot.hexCode }}
                  />
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="text-preset-5 text-grey-500">
                      {pot.name}
                    </div>
                    <div className="text-preset-4-bold text-grey-900">
                      {currencyFormatter(pot.totalAmountSaved)}
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

export default SummaryPotsCard;
