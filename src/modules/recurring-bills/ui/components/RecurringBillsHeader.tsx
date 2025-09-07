import { IconRecurringBills } from "@/shared/ui/icons";

type Props = {
  total: number;
  paid: number;
  upcoming: number;
  dueSoon: number;
};

const toCurrency = (n: number) => `$${n.toFixed(2)}`;

export const RecurringBillsHeader = ({
  total,
  paid,
  upcoming,
  dueSoon,
}: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6">
      {/* Total Bills Card */}
      <section className="rounded-xl bg-grey-900 text-white p-6 md:p-8 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <IconRecurringBills className="w-6 h-6 text-white" />
          <h2 className="text-preset-3">Total Bills</h2>
        </div>
        <div className="text-preset-1">{toCurrency(total)}</div>
      </section>

      {/* Summary Card */}
      <section className="card stack-6">
        <h3 className="text-preset-3 text-grey-900">Summary</h3>
        <div className="flex flex-col gap-4">
          <Row label="Paid Bills" value={toCurrency(paid)} />
          <Row label="Total Upcoming" value={toCurrency(upcoming)} />
          <Row label="Due Soon" value={toCurrency(dueSoon)} highlight />
        </div>
      </section>
    </div>
  );
};

const Row = ({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div className="flex items-center justify-between">
    <span
      className={`text-preset-4 ${
        highlight ? "text-red-500" : "text-grey-500"
      }`}
    >
      {label}
    </span>
    <span
      className={`text-preset-4-bold ${
        highlight ? "text-red-500" : "text-grey-900"
      }`}
    >
      {value}
    </span>
  </div>
);
