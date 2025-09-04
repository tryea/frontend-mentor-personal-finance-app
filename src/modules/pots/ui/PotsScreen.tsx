"use client";
import { LayoutHeader } from "@/shared/ui/primitives/LayoutHeader";
import data from "../../../../data.json";
import { PotsList } from "./components/PotsList";
import { useState } from "react";
import {
  PotsAddPotModal,
  type AddPotPayload,
} from "./components/PotsAddPotModal";
import {
  PotsEditPotModal,
  type EditPotPayload,
} from "./components/PotsEditPotModal";
import { PotsDeletePotModal } from "./components/PotsDeletePotModal";
import { PotsAddMoneyModal } from "./components/PotsAddMoneyModal";
import { PotsWithdrawMoneyModal } from "./components/PotsWithdrawMoneyModal";

export type PotItem = {
  name: string;
  target: number;
  total: number;
  theme: string; // hex from data.json mapped to CSS vars via mapping
};

type Data = { pots: PotItem[] };

export const PotsScreen = () => {
  const initial: PotItem[] = (data as Data).pots;
  const [pots, setPots] = useState<PotItem[]>(initial);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [addMoneyIndex, setAddMoneyIndex] = useState<number | null>(null);
  const [withdrawIndex, setWithdrawIndex] = useState<number | null>(null);

  const handleAdd = (payload: AddPotPayload) => {
    setPots((prev) => [
      ...prev,
      {
        name: payload.name,
        target: payload.target,
        total: 0,
        theme: payload.theme,
      },
    ]);
  };

  const openEdit = (index: number) => setEditIndex(index);
  const closeEdit = () => setEditIndex(null);

  const openDelete = (index: number) => setDeleteIndex(index);
  const closeDelete = () => setDeleteIndex(null);

  const openAddMoney = (index: number) => setAddMoneyIndex(index);
  const closeAddMoney = () => setAddMoneyIndex(null);

  const openWithdraw = (index: number) => setWithdrawIndex(index);
  const closeWithdraw = () => setWithdrawIndex(null);

  const handleAddMoney = (amount: number) => {
    if (addMoneyIndex === null) return;
    setPots((prev) =>
      prev.map((p, i) =>
        i === addMoneyIndex ? { ...p, total: Math.max(0, p.total + amount) } : p
      )
    );
    closeAddMoney();
  };

  const handleWithdraw = (amount: number) => {
    if (withdrawIndex === null) return;
    setPots((prev) =>
      prev.map((p, i) =>
        i === withdrawIndex ? { ...p, total: Math.max(0, p.total - amount) } : p
      )
    );
    closeWithdraw();
  };

  const handleEdit = (payload: EditPotPayload) => {
    if (editIndex === null) return;
    setPots((prev) =>
      prev.map((p, idx) =>
        idx === editIndex
          ? {
              ...p,
              name: payload.name,
              target: payload.target,
              theme: payload.theme,
            }
          : p
      )
    );
    closeEdit();
  };

  const handleDelete = () => {
    if (deleteIndex === null) return;
    setPots((prev) => prev.filter((_, idx) => idx !== deleteIndex));
    closeDelete();
  };

  const editing = editIndex !== null ? pots[editIndex] : null;
  const deleting = deleteIndex !== null ? pots[deleteIndex] : null;
  const addingTo = addMoneyIndex !== null ? pots[addMoneyIndex] : null;
  const withdrawingFrom = withdrawIndex !== null ? pots[withdrawIndex] : null;

  return (
    <>
      <LayoutHeader
        title="Pots"
        actionName="+Add New Pot"
        onActionClick={() => setIsAddOpen(true)}
      />
      <PotsList
        items={pots}
        onEdit={openEdit}
        onDelete={openDelete}
        onAddMoney={openAddMoney}
        onWithdraw={openWithdraw}
      />
      <PotsAddPotModal
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAdd}
      />
      <PotsEditPotModal
        open={editIndex !== null}
        onClose={closeEdit}
        onSubmit={handleEdit}
        initial={editing ?? undefined}
      />
      <PotsDeletePotModal
        open={deleteIndex !== null}
        onClose={closeDelete}
        onConfirm={handleDelete}
        name={deleting?.name ?? ""}
      />
      <PotsAddMoneyModal
        open={addMoneyIndex !== null}
        onClose={closeAddMoney}
        onConfirm={handleAddMoney}
        pot={addingTo ?? undefined}
      />
      <PotsWithdrawMoneyModal
        open={withdrawIndex !== null}
        onClose={closeWithdraw}
        onConfirm={handleWithdraw}
        pot={withdrawingFrom ?? undefined}
      />
    </>
  );
};

export default PotsScreen;
