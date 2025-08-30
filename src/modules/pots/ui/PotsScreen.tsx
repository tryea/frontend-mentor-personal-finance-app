"use client";
import { LayoutHeader } from "@/src/shared/ui/primitives/LayoutHeader";
import data from "../../../../data.json";
import { PotsList } from "./components/PotsList";
import { useState } from "react";
import { PotsAddPotModal, type AddPotPayload } from "./components/PotsAddPotModal";
import { PotsEditPotModal, type EditPotPayload } from "./components/PotsEditPotModal";

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

  const handleAdd = (payload: AddPotPayload) => {
    setPots((prev) => [...prev, { name: payload.name, target: payload.target, total: 0, theme: payload.theme }]);
  };

  const openEdit = (index: number) => setEditIndex(index);
  const closeEdit = () => setEditIndex(null);

  const handleEdit = (payload: EditPotPayload) => {
    if (editIndex === null) return;
    setPots((prev) =>
      prev.map((p, idx) => (idx === editIndex ? { ...p, name: payload.name, target: payload.target, theme: payload.theme } : p))
    );
    closeEdit();
  };

  const editing = editIndex !== null ? pots[editIndex] : null;

  return (
    <>
      <LayoutHeader title="Pots" actionName="Add New Pot" onActionClick={() => setIsAddOpen(true)} />
      <PotsList items={pots} onEdit={openEdit} />
      <PotsAddPotModal open={isAddOpen} onClose={() => setIsAddOpen(false)} onSubmit={handleAdd} />
      <PotsEditPotModal
        open={editIndex !== null}
        onClose={closeEdit}
        onSubmit={handleEdit}
        initial={editing ?? undefined}
      />
    </>
  );
};

export default PotsScreen;