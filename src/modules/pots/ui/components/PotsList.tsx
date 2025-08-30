import React from "react";
import { PotItem } from "../PotsScreen";
import { PotSectionCard } from "./cards/PotSectionCard";

export const PotsList = ({ items, onEdit }: { items: PotItem[]; onEdit: (index: number) => void }) => {
  return (
    <div className="pots-grid">
      {items.map((p, idx) => (
        <PotSectionCard key={p.name + idx} item={p} index={idx} onEdit={onEdit} />
      ))}
    </div>
  );
};