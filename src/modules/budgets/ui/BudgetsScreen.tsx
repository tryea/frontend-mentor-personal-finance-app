"use client";
import { LayoutHeader } from "@/shared/ui/primitives/LayoutHeader";
import raw from "../../../../data.json";
import { BudgetsHeader } from "./components/BudgetsHeader";
import { BudgetList } from "./components/BudgetList";
import { useState, useEffect } from "react";
import { useSession, useUser } from "@clerk/nextjs";
import {
  BudgetsAddBudgetModal,
  type AddBudgetPayload,
} from "./components/BudgetsAddBudgetModal";
import {
  BudgetsEditBudgetModal,
  type EditBudgetPayload,
} from "./components/BudgetsEditBudgetModal";
import { BudgetsDeleteBudgetModal } from "./components/BudgetsDeleteBudgetModal";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export interface BudgetItem {
  category_id: string;
  categories: {
    id: string;
    name: string;
  };
  maximum_amount: number;
  theme_id: string;
  themes: {
    id: string;
    name: string;
    hex_code: string;
  };
}

export interface TransactionItem {
  avatar?: string;
  name: string;
  category: string;
  date: string;
  amount: number;
}

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
  const [loading, setLoading] = useState(true);
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  // Clerk hooks for authentication
  const { session } = useSession();

  useEffect(() => {
    if (!session) return;

    const client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        accessToken: () => session.getToken()!,
      }
    );
    setSupabase(client);
  }, [session]);

  // This `useEffect` will wait for the User object to be loaded before requesting
  // the tasks for the signed in user
  useEffect(() => {
    if (!supabase) return;

    async function loadTasks() {
      if (!supabase) return;

      setLoading(true);

      const { data: budgetsData, error } = await supabase
        .from("budgets")
        .select(
          "categories(id, name), category_id, maximum_amount, theme_id, themes(name, hex_code)"
        );
      if (!error) setBudgets(budgetsData);
      setLoading(false);

      console.log({ budgetsData });
    }

    loadTasks();
  }, [supabase]);

  const handleSubmit = async (payload: AddBudgetPayload) => {
    const newBudget = {
      category: payload.category,
      maximum: payload.maximum,
      theme: payload.theme,
    };

    // Add to local state immediately for optimistic UI
    // setBudgets((prev) => [...prev, newBudget]);

    // Save to Supabase if client is available
    if (supabase) {
      try {
        const { error } = await supabase.from("budgets").insert([newBudget]);

        if (error) {
          console.error("Error saving budget to Supabase:", error);
          // Could show a toast notification here
        }
      } catch (error) {
        console.error("Error saving budget:", error);
      }
    }
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
    // setBudgets((prev) =>
    //   prev.map((b, idx) =>
    //     idx === editIndex
    //       ? {
    //           category: payload.category,
    //           maximum: payload.maximum,
    //           theme: payload.theme,
    //         }
    //       : b
    //   )
    // );
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
        {loading && (
          <div className="flex justify-center items-center py-8">
            <p className="text-grey-500">Loading budgets...</p>
          </div>
        )}
        {!loading && (
          <>
            <BudgetsHeader
              items={budgets.map((e) => ({
                name: e.categories.name,
                spent: 0,
                maximum: e.maximum_amount,
                color: e.themes.hex_code,
              }))}
              total={{ spent: 0, maximum: 0 }}
            />
            <BudgetList
              items={budgets.map((e) => ({
                category: e.categories.name,
                free: 0,
                color: e.themes.hex_code,
                latest: [],
                maximum: e.maximum_amount,
                spent: 0,
              }))}
              toCurrency={(n) => n.toFixed(2)}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          </>
        )}
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
