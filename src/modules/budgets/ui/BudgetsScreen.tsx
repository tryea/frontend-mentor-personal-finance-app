"use client";
import { LayoutHeader } from "@/src/shared/ui/primitives/LayoutHeader";
import raw from "../../../../data.json";
import { BudgetsHeader } from "./components/BudgetsHeader";
import { BudgetList } from "./components/BudgetList";
import { useMemo, useState } from "react";
import {
  BudgetsAddBudgetModal,
  type AddBudgetPayload,
} from "./components/BudgetsAddBudgetModal";
import {
  BudgetsEditBudgetModal,
  type EditBudgetPayload,
} from "./components/BudgetsEditBudgetModal";
import { BudgetsDeleteBudgetModal } from "./components/BudgetsDeleteBudgetModal";

export interface BudgetItem {
  category: string;
  maximum: number;
  theme?: string;
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
  Entertainment: { bgClass: "bg-green-500", cssVar: "var(--color-green-500)" },
  Bills: { bgClass: "bg-cyan-500", cssVar: "var(--color-cyan-500)" },
  "Dining Out": { bgClass: "bg-yellow-500", cssVar: "var(--color-yellow-500)" },
  "Personal Care": { bgClass: "bg-navy-500", cssVar: "var(--color-navy-500)" },
};

const toCurrency = (n: number) => `$${n.toFixed(2)}`;
const parseDate = (s: string) => new Date(s);

// Strongly type imported JSON without using any
interface DataShape {
  budgets: BudgetItem[];
  transactions: TransactionItem[];
}
const data: DataShape = raw as unknown as DataShape;

export const BudgetsScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [budgets, setBudgets] = useState<BudgetItem[]>(data.budgets);
  const transactions = data.transactions;

  const enriched = useMemo(() => {
    return budgets.map((b) => {
      const spent = transactions
        .filter((t) => t.category === b.category && t.amount < 0)
        .reduce((acc, t) => acc + Math.abs(t.amount), 0);
      const free = Math.max(b.maximum - spent, 0);
      const latest = transactions
        .filter((t) => t.category === b.category)
        .sort(
          (a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime()
        )
        .slice(0, 4);
      const color = CATEGORY_COLORS[b.category] ?? {
        bgClass: "bg-grey-300",
        cssVar: "var(--color-grey-300)",
      };
      return { ...b, spent, free, latest, color };
    });
  }, [budgets, transactions]);

  const totals = useMemo(() => {
    const spent = enriched.reduce((acc, b) => acc + b.spent, 0);
    const maximum = enriched.reduce((acc, b) => acc + b.maximum, 0);
    return { spent, maximum };
  }, [enriched]);

  const handleSubmit = (payload: AddBudgetPayload) => {
    setBudgets((prev) => [
      ...prev,
      {
        category: payload.category,
        maximum: payload.maximum,
        theme: payload.theme,
      },
    ]);
  };

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setEditOpen(true);
  };

  const handleDeleteClick = (index: number) => {
    setDeleteIndex(index);
    setDeleteOpen(true);
  };

  const handleEditSubmit = (payload: EditBudgetPayload) => {
    setBudgets((prev) =>
      prev.map((b, idx) =>
        idx === editIndex
          ? {
              category: payload.category,
              maximum: payload.maximum,
              theme: payload.theme,
            }
          : b
      )
    );
  };

  const confirmDelete = () => {
    if (deleteIndex === null) return;
    setBudgets((prev) => prev.filter((_, idx) => idx !== deleteIndex));
    setDeleteOpen(false);
    setDeleteIndex(null);
  };

  const initialForEdit = editIndex !== null ? budgets[editIndex] ?? null : null;
  const categoryForDelete =
    deleteIndex !== null ? budgets[deleteIndex]?.category ?? null : null;

  return (
    <>
      <LayoutHeader
        title="Budgets"
        actionName="+ Add New Budget"
        onActionClick={() => setIsOpen(true)}
      />
      <div className="flex flex-col gap-6">
        <BudgetsHeader
          items={enriched.map((e) => ({
            name: e.category,
            spent: e.spent,
            maximum: e.maximum,
            color: e.color,
          }))}
          total={totals}
        />
        <BudgetList
          items={enriched}
          toCurrency={toCurrency}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </div>
      <BudgetsAddBudgetModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        existingCategories={budgets.map((b) => b.category)}
      />
      <BudgetsEditBudgetModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSubmit={handleEditSubmit}
        existingCategories={budgets.map((b) => b.category)}
        initial={initialForEdit}
      />
      <BudgetsDeleteBudgetModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
        category={categoryForDelete}
      />
    </>
  );
};

export default BudgetsScreen;
