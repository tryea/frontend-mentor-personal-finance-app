import { currencyFormatter } from "@/shared/utils/formatter";
import React from "react";

const BalanceCard = ({
  title,
  value,
  isDark,
}: {
  title: string;
  value: number;
  isDark?: boolean;
}) => {
  return (
    <div
      data-isdark={isDark}
      className='medium-card bg-white data-[isdark="true"]:bg-grey-900 rounded-xl'
    >
      <p className="text-preset-4 text-grey-500">{title}</p>
      <p
        data-isdark={isDark}
        className='text-preset-1 data-[isdark="true"]:text-white text-grey-900 '
      >
        {currencyFormatter(value)}
      </p>
    </div>
  );
};

export default BalanceCard;
