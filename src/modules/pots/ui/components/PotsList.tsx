import React from "react";
import { PotItem } from "../PotsScreen";
import { PotSectionCard } from "./cards/PotSectionCard";

export const PotsList = ({ items }: { items: PotItem[] }) => {
  return (
    <div className="pots-grid">
      {items.map((p) => (
        <PotSectionCard key={p.name} item={p} />
      ))}
    </div>
  );
};