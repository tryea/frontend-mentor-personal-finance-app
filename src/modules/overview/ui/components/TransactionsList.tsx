import React from "react";

export type TransactionListItem = {
  avatar: string;
  name: string;
  date: string; // ISO date string
  amount: number;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });

export const TransactionsList = ({ items }: { items: TransactionListItem[] }) => {
  return (
    <div className="flex flex-col gap-4">
      {items.map((t, index) => (
        <React.Fragment key={`tx-${index}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={t.avatar} alt="" className="h-8 w-8 rounded-full" />
              <div className="flex flex-col">
                <span className="text-preset-4-bold text-grey-900">{t.name}</span>
                <span className="text-preset-5 text-grey-500">{formatDate(t.date)}</span>
              </div>
            </div>
            <div className={`text-preset-4-bold ${t.amount > 0 ? "text-green-500" : "text-grey-900"}`}>
              {t.amount > 0 ? "+" : "-"}${Math.abs(t.amount).toFixed(2)}
            </div>
          </div>
          {index < items.length - 1 && <div className="divider-h" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default TransactionsList;