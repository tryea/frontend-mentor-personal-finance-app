import { TransactionItem } from "@/shared/types/transaction";
import { currencyFormatter, dateFormatter } from "@/shared/utils/formatter";
import React from "react";

export const TransactionsList = ({ items }: { items: TransactionItem[] }) => {
  return (
    <div className="flex flex-col gap-4 lg:gap-5">
      {items.map((t, index) => (
        <React.Fragment key={`tx-${index}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={t.contactAvatarUrl}
                alt=""
                className="h-8 w-8 rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-preset-4-bold text-grey-900">
                  {t.contactName}
                </span>
                <span className="text-preset-5 text-grey-500">
                  {dateFormatter(t.transactionDate)}
                </span>
              </div>
            </div>
            <div
              className={`text-preset-4-bold ${
                t.type === "INCOME" ? "text-green-500" : "text-grey-900"
              }`}
            >
              {t.type === "INCOME" ? "+" : "-"}
              {currencyFormatter(t.amount)}
            </div>
          </div>
          {index < items.length - 1 && <div className="divider-h" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default TransactionsList;
