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
    <div>
      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-preset-4 text-gray-400">
                Recipient / Sender
              </th>
              <th className="px-6 py-3 text-left text-preset-4 text-gray-400">
                Category
              </th>
              <th className="px-6 py-3 text-left text-preset-4 text-gray-400">
                Transaction Date
              </th>
              <th className="px-6 py-3 text-left text-preset-4 text-gray-400">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {transactions.map((transaction: Transaction, index: number) => (
              <tr key={index}>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={transaction.avatar}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-preset-3 font-medium text-gray-900">
                        {transaction.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-preset-4 text-gray-900">
                    {transaction.category}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-preset-4 text-gray-500">
                    {transaction.date}
                  </div>
                </td>
                <td
                  className={`whitespace-nowrap px-6 py-4 text-preset-3 font-semibold ${
                    transaction.amount > 0 ? "text-green-500" : "text-gray-900"
                  }`}
                >
                  {transaction.amount > 0 ? "+" : ""}$
                  {Math.abs(transaction.amount).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="block md:hidden">
        <div className="space-y-4">
          {transactions.map((transaction: Transaction, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg bg-white p-4"
            >
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={transaction.avatar}
                    alt=""
                  />
                </div>
                <div className="ml-4">
                  <div className="text-preset-3 font-medium text-gray-900">
                    {transaction.name}
                  </div>
                  <div className="text-preset-4 text-gray-500">
                    {transaction.date}
                  </div>
                </div>
              </div>
              <div
                className={`text-preset-3 font-semibold ${
                  transaction.amount > 0 ? "text-green-500" : "text-gray-900"
                }`}
              >
                {transaction.amount > 0 ? "+" : "-"}$
                {Math.abs(transaction.amount).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
