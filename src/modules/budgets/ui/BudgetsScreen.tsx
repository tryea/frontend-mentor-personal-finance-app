"use client";
import { useSession } from "@clerk/nextjs";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { LayoutHeader } from "@/shared/ui/primitives/LayoutHeader";
import { type BudgetItem, type TransactionItem } from "../types";
import { BudgetList } from "./components/BudgetList";
import {
  type AddBudgetPayload,
  BudgetsAddBudgetModal,
} from "./components/BudgetsAddBudgetModal";
import { BudgetsDeleteBudgetModal } from "./components/BudgetsDeleteBudgetModal";
import {
  BudgetsEditBudgetModal,
  type EditBudgetPayload,
} from "./components/BudgetsEditBudgetModal";
import { BudgetsHeader } from "./components/BudgetsHeader";

export const BudgetsScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [budgets, setBudgets] = useState<BudgetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  // Clerk hooks for authentication
  const { session } = useSession();

  useEffect(() => {
    if (!session) return;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase environment variables");
      return;
    }

    const client = createClient(supabaseUrl, supabaseKey, {
      accessToken: async () => {
        const token = await session.getToken();
        return token || "";
      },
    });
    setSupabase(client);
  }, [session]);

  // This `useEffect` will wait for the User object to be loaded before requesting
  // the tasks for the signed in user
  useEffect(() => {
    if (!supabase) return;

    async function loadTasks() {
      if (!supabase) return;

      setLoading(true);

      const { data: budgetsData, error } = await supabase.rpc(
        "get_budget_details"
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

  const handleEditSubmit = (_payload: EditBudgetPayload) => {
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

  const initialForEdit =
    editIndex !== null && budgets[editIndex]
      ? {
          category: budgets[editIndex].category_name,
          maximum: budgets[editIndex].maximum_amount,
          theme: budgets[editIndex].theme_color,
        }
      : null;
  const categoryForDelete =
    deleteIndex !== null ? budgets[deleteIndex]?.category_name ?? null : null;

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
                name: e.category_name,
                spent: e.total_spent,
                maximum: e.maximum_amount,
                color: e.theme_color,
              }))}
              total={{
                spent: budgets.reduce((sum, b) => sum + b.total_spent, 0),
                maximum: budgets.reduce((sum, b) => sum + b.maximum_amount, 0),
              }}
            />
            <BudgetList
              items={budgets.map((e) => ({
                category: e.category_name,
                free: e.maximum_amount - e.total_spent,
                color: e.theme_color,
                latest: e.latest_transactions.map((t) => ({
                  name: t.contact_name,
                  avatar: t.contact_avatar_url,
                  category: e.category_name,
                  date: t.date,
                  amount: t.amount,
                })),
                maximum: e.maximum_amount,
                spent: e.total_spent,
              }))}
              toCurrency={(n) => `$${n.toFixed(2)}`}
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
        existingCategories={budgets.map((b) => b.category_name)}
      />
      <BudgetsEditBudgetModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSubmit={handleEditSubmit}
        existingCategories={budgets.map((b) => b.category_name)}
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
