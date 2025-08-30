import { LayoutHeader } from "@/src/shared/ui/primitives/LayoutHeader";
import data from "../../../../data.json";
import { BudgetsHeader } from "./components/BudgetsHeader";
import { BudgetList } from "./components/BudgetList";

export interface BudgetItem {
  category: string;
  maximum: number;
}

export interface TransactionItem {
  avatar?: string;
  name: string;
  category: string;
  date: string;
  amount: number;
}

export type CategoryColor = {
  bgClass: string;
  cssVar: string;
};

const CATEGORY_COLORS: Record<string, CategoryColor> = {
  "Entertainment": { bgClass: "bg-green-500", cssVar: "var(--color-green-500)" },
  "Bills": { bgClass: "bg-cyan-500", cssVar: "var(--color-cyan-500)" },
  "Dining Out": { bgClass: "bg-yellow-500", cssVar: "var(--color-yellow-500)" },
  "Personal Care": { bgClass: "bg-navy-500", cssVar: "var(--color-navy-500)" },
};

const toCurrency = (n: number) => `$${n.toFixed(2)}`;
const parseDate = (s: string) => new Date(s);

export const BudgetsScreen = () => {
  const budgets: BudgetItem[] = (data as any).budgets;
  const transactions: TransactionItem[] = (data as any).transactions;

  const enriched = budgets.map((b) => {
    const spent = transactions
      .filter((t) => t.category === b.category && t.amount < 0)
      .reduce((acc, t) => acc + Math.abs(t.amount), 0);
    const free = Math.max(b.maximum - spent, 0);
    const latest = transactions
      .filter((t) => t.category === b.category)
      .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())
      .slice(0, 4);
    const color = CATEGORY_COLORS[b.category] ?? { bgClass: "bg-grey-300", cssVar: "var(--color-grey-300)" };
    return { ...b, spent, free, latest, color };
  });

  const totalSpent = enriched.reduce((acc, b) => acc + b.spent, 0);
  const totalMax = enriched.reduce((acc, b) => acc + b.maximum, 0);

  return (
    <>
      <LayoutHeader title="Budgets" actionName="Add New Budget" />
      <div className="flex flex-col gap-6">
        <BudgetsHeader
          items={enriched.map((e) => ({
            name: e.category,
            spent: e.spent,
            maximum: e.maximum,
            color: e.color,
          }))}
          total={{ spent: totalSpent, maximum: totalMax }}
        />
        <BudgetList items={enriched} toCurrency={toCurrency} />
      </div>
    </>
  );
};

export default BudgetsScreen;