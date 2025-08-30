export type BillItem = {
  name: string;
  avatar?: string;
  category: string;
  amount: number;
  latestDate: Date;
  nextDueDate: Date;
};

const dayWithSuffix = (d: number) => {
  const j = d % 10,
    k = d % 100;
  if (j === 1 && k !== 11) return `${d}st`;
  if (j === 2 && k !== 12) return `${d}nd`;
  if (j === 3 && k !== 13) return `${d}rd`;
  return `${d}th`;
};

export const RecurringBillList = ({ items, toCurrency }: { items: BillItem[]; toCurrency: (n: number) => string }) => {
  return (
    <ul className="divide-y divide-beige-500 rounded-xl border border-beige-500 overflow-hidden">
      {items.map((bill) => (
        <li key={`${bill.name}-${bill.latestDate.toISOString()}`} className="flex items-center gap-4 px-5 py-4 bg-white">
          <div className="h-8 w-8 rounded-full flex items-center justify-center overflow-hidden">
            {bill.avatar ? (
              <img src={bill.avatar} alt="" className="h-8 w-8 object-cover" />
            ) : (
              <div className="h-8 w-8 rounded-full bg-grey-100" />
            )}
          </div>
          <div className="flex-1">
            <div className="text-preset-4-bold text-grey-900">{bill.name}</div>
            <div className="text-preset-5 text-beige-500">Monthly - {dayWithSuffix(bill.nextDueDate.getDate())}</div>
          </div>
          <div className="min-w-[120px] text-right">
            <div className="text-preset-4-bold text-grey-900">{toCurrency(bill.amount)}</div>
          </div>
        </li>
      ))}
    </ul>
  );
};