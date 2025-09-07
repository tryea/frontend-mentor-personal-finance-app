"use client";

import { useState, useEffect } from "react";
import { PotItem } from "@/shared/types/pots";
import { AddPotPayload } from "../components/PotsAddPotModal";
import { EditPotPayload } from "../components/PotsEditPotModal";
import { useSupabaseClient } from "@/shared/hooks/useSupabaseClient";
import { useToast } from "@/shared/contexts/ToastContext";

type Theme = {
  id: number;
  name: string;
  hexCode: string;
};

export function usePotsActions(
  pots: PotItem[] | null,
  setPots: (updater: (prev: PotItem[]) => PotItem[]) => void
) {
  const supabase = useSupabaseClient();
  const { showToast } = useToast();
  const [themes, setThemes] = useState<Theme[]>([]);

  // Modal states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [addMoneyIndex, setAddMoneyIndex] = useState<number | null>(null);
  const [withdrawIndex, setWithdrawIndex] = useState<number | null>(null);

  // Modal open/close handlers
  const openAdd = () => setIsAddOpen(true);
  const closeAdd = () => setIsAddOpen(false);

  const openEdit = (index: number) => setEditIndex(index);
  const closeEdit = () => setEditIndex(null);

  const openDelete = (index: number) => setDeleteIndex(index);
  const closeDelete = () => setDeleteIndex(null);

  const openAddMoney = (index: number) => setAddMoneyIndex(index);
  const closeAddMoney = () => setAddMoneyIndex(null);

  const openWithdraw = (index: number) => setWithdrawIndex(index);
  const closeWithdraw = () => setWithdrawIndex(null);

  // CRUD operations
  const handleAdd = async (payload: AddPotPayload) => {
    if (!supabase) {
      console.error("Supabase client not available");
      return;
    }

    try {
      // Find theme_id from themes data
      const selectedTheme = themes.find(
        (theme) => theme.hexCode === payload.theme
      );
      if (!selectedTheme) {
        console.error("Theme not found");
        return;
      }

      // Insert pot to database
      const { data: newPot, error } = await supabase
        .from("pots")
        .insert({
          name: payload.name,
          target_amount: payload.target,
          theme_id: selectedTheme.id,
        })
        .select("id, name, target_amount, created_at, themes!inner(hex_code)")
        .single();

      if (error) {
        console.error("Error adding pot to database:", error);
        return;
      }

      // Add to local state after successful database insert
      setPots((prev) => [
        ...prev,
        {
          id: newPot.id,
          name: newPot.name,
          targetAmount: newPot.target_amount,
          totalAmountSaved: 0,
          hexCode: (newPot.themes as any)?.hex_code || payload.theme,
          createdAt: newPot.created_at,
        },
      ]);

      // Show success toast
      showToast('Pot berhasil ditambahkan!', 'success');

      closeAdd();
    } catch (error) {
      console.error("Error in handleAdd:", error);
      showToast('Gagal menambahkan pot. Silakan coba lagi.', 'error');
    }
  };

  const handleEdit = (payload: EditPotPayload) => {
    if (editIndex === null) return;
    setPots((prev) =>
      prev.map((p, idx) =>
        idx === editIndex
          ? {
              ...p,
              name: payload.name,
              targetAmount: payload.target,
              hexCode: payload.theme,
            }
          : p
      )
    );
    showToast('Pot berhasil diperbarui!', 'success');
    closeEdit();
  };

  const handleDelete = () => {
    if (deleteIndex === null) return;
    setPots((prev) => prev.filter((_, idx) => idx !== deleteIndex));
    showToast('Pot berhasil dihapus!', 'success');
    closeDelete();
  };

  const handleAddMoney = (amount: number) => {
    if (addMoneyIndex === null) return;
    setPots((prev) =>
      prev.map((p, i) =>
        i === addMoneyIndex
          ? { ...p, totalAmountSaved: Math.max(0, p.totalAmountSaved + amount) }
          : p
      )
    );
    showToast('Uang berhasil ditambahkan ke pot!', 'success');
    closeAddMoney();
  };

  const handleWithdraw = (amount: number) => {
    if (withdrawIndex === null) return;
    setPots((prev) =>
      prev.map((p, i) =>
        i === withdrawIndex
          ? { ...p, totalAmountSaved: Math.max(0, p.totalAmountSaved - amount) }
          : p
      )
    );
    showToast('Uang berhasil ditarik dari pot!', 'success');
    closeWithdraw();
  };

  // Computed values for modals
  const editing = editIndex !== null && pots ? pots[editIndex] : null;
  const deleting = deleteIndex !== null && pots ? pots[deleteIndex] : null;
  const addingTo = addMoneyIndex !== null && pots ? pots[addMoneyIndex] : null;
  const withdrawingFrom =
    withdrawIndex !== null && pots ? pots[withdrawIndex] : null;

  // Fetch themes on component mount
  useEffect(() => {
    if (!supabase) return;

    const fetchThemes = async () => {
      try {
        const { data: themesData, error } = await supabase
          .from("themes")
          .select("id, name, hexCode: hex_code");

        if (error) {
          console.error("Error fetching themes:", error);
          return;
        }

        setThemes(themesData || []);
        console.log("Themes loaded:", themesData);
      } catch (error) {
        console.error("Error in fetchThemes:", error);
      }
    };

    fetchThemes();
  }, [supabase]);

  return {
    modals: {
      isAddOpen,
      editIndex,
      deleteIndex,
      addMoneyIndex,
      withdrawIndex,
    },
    actions: {
      openAdd,
      closeAdd,
      openEdit,
      closeEdit,
      openDelete,
      closeDelete,
      openAddMoney,
      closeAddMoney,
      openWithdraw,
      closeWithdraw,
    },
    handlers: {
      handleAdd,
      handleEdit,
      handleDelete,
      handleAddMoney,
      handleWithdraw,
    },
    computed: {
      editing,
      deleting,
      addingTo,
      withdrawingFrom,
    },
    data: {
      themes,
    },
  };
}
