import { RecurringItemList } from "@/shared/types/recurringBill";
import { currencyFormatter } from "@/shared/utils/formatter";

const dayWithSuffix = (d: number) => {
  const j = d % 10,
    k = d % 100;
  if (j === 1 && k !== 11) return `${d}st`;
  if (j === 2 && k !== 12) return `${d}nd`;
  if (j === 3 && k !== 13) return `${d}rd`;
  return `${d}th`;
};

export const RecurringBillList = ({
  items,
}: {
  items: RecurringItemList[];
}) => {
  return (
    <ul className="divide-y divide-beige-500 rounded-xl border border-beige-500 overflow-hidden">
      {items.map((bill) => (
        <li
          key={`${bill.contactName}-${new Date(bill.dueDate).toISOString()}`}
          className="flex items-center gap-4 px-5 py-4 bg-white"
        >
          <div className="h-8 w-8 rounded-full flex items-center justify-center overflow-hidden">
            {bill.contactAvatarUrl ? (
              <img
                src={bill.contactAvatarUrl}
                alt=""
                className="h-8 w-8 object-cover"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-grey-100" />
            )}
          </div>
          <div className="flex-1">
            <div className="text-preset-4-bold text-grey-900">
              {bill.contactName}
            </div>
            <div className="text-preset-5 text-beige-500">
              Monthly - {dayWithSuffix(new Date(bill.dueDate).getDate())}
            </div>
          </div>
          <div className="min-w-[120px] text-right">
            <div className="text-preset-4-bold text-grey-900">
              {currencyFormatter(bill.amount)}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
