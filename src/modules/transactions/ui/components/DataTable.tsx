import React from "react";

interface Transaction {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
}

interface DataTableProps {
  transactions: Transaction[];
}

export const DataTable = ({ transactions }: DataTableProps) => {
  return (
    <div className="flex flex-1 flex-col grow min-w-0 min-h-0 max-w-full overflow-y-scroll overscroll-y-contain">
      {/* Desktop Table */}
      <div className="hidden md:flex flex-col gap-6">
        {/* Table Header */}
        <div className="w-full flex flex-row px-4 py-3 gap-8 text-preset-5 text-grey-500 border-b border-grey-100">
          <div className="flex flex-1 flex-grow">Recipient / Sender</div>
          <div className="flex flex-none md:w-[80px] lg:w-[220px]">
            Category
          </div>
          <div className="flex flex-none md:w-[88px] lg:w-[120px]">
            Transaction Date
          </div>
          <div className="flex flex-none md:w-[88px] lg:w-[200px] justify-end">
            Amount
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          {transactions.map((transaction: Transaction, index: number) => (
            <React.Fragment key={`wrapper-${index}`}>
              <div
                key={`data-${index}`}
                className="flex flex-row px-4 gap-8 text-preset-5"
              >
                <div className="flex flex-1 flex-grow flex-row gap-4">
                  <div className="flex flex-none w-10 aspect-square">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={transaction.avatar}
                      alt=""
                    />
                  </div>
                  <div className="text-preset-4-bold text-grey-900 flex-1 flex">
                    {transaction.name}
                  </div>
                </div>
                <div className="flex flex-none md:w-[80px] lg:w-[220px]">
                  {transaction.category}
                </div>
                <div className="flex flex-none md:w-[88px] lg:w-[120px]">
                  {new Date(transaction.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
                <div
                  className={`flex flex-none md:w-[88px] lg:w-[200px] justify-end text-preset-4-bold ${
                    transaction.amount > 0 ? "text-green-500" : "text-gray-900"
                  }`}
                >
                  {transaction.amount > 0 ? "+" : "-"}$
                  {Math.abs(transaction.amount).toFixed(2)}
                </div>
              </div>
              {index < transactions.length - 1 && (
                <div
                  key={`divider-${index}`}
                  className="h-[1px] w-full bg-grey-100"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="block md:hidden">
        <div className="w-full flex flex-col gap-4">
          {transactions.map((transaction: Transaction, index: number) => (
            <React.Fragment key={`wrapper-${index}`}>
              <div
                key={index}
                className="flex flex-row items-center justify-between"
              >
                <div className="flex items-center gap-3 flex-row">
                  {/* Avatar */}
                  <div className="h-8 w-8 flex-shrink-0">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={transaction.avatar}
                      alt=""
                    />
                  </div>
                  {/* Information */}
                  <div className="flex flex-col gap-1 justify-center items-start">
                    <div className="text-preset-4-bold text-grey-900">
                      {transaction.name}
                    </div>
                    <div className="text-preset-5 text-grey-500">
                      {transaction.category}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1 justify-center items-start text-right">
                  <div
                    className={`text-preset-4-bold ${
                      transaction.amount > 0
                        ? "text-green-500"
                        : "text-gray-900"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : "-"}$
                    {Math.abs(transaction.amount).toFixed(2)}
                  </div>
                  <div className="text-preset-5 text-grey-500">
                    {new Date(transaction.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>
              {index < transactions.length - 1 && (
                <div
                  key={`divider-${index}`}
                  className="h-[1px] w-full bg-grey-100"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
