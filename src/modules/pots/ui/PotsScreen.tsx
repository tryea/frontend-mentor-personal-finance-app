"use client";
import { LayoutHeader } from "@/src/shared/ui/primitives/LayoutHeader";
import data from "../../../../data.json";
import { PotsList } from "./components/PotsList";
import { useState } from "react";
import { PotsAddPotModal, type AddPotPayload } from "./components/PotsAddPotModal";

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
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (payload: AddPotPayload) => {
    setPots((prev) => [...prev, { name: payload.name, target: payload.target, total: 0, theme: payload.theme }]);
  };

  return (
    <>
      <LayoutHeader title="Pots" actionName="Add New Pot" onActionClick={() => setIsOpen(true)} />
      <PotsList items={pots} />
      <PotsAddPotModal open={isOpen} onClose={() => setIsOpen(false)} onSubmit={handleSubmit} />
    </>
  );
};

export default PotsScreen;