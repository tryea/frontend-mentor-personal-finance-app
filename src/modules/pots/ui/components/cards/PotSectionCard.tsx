import React, { useState } from "react";
import { PotItem } from "../../PotsScreen";
import { IconEllipsis } from "@/src/shared/ui/icons";

const COLOR_MAP: Record<string, { bgClass: string; cssVar: string }> = {
  "#277C78": { bgClass: "bg-green-500", cssVar: "var(--color-green-500)" },
  "#626070": { bgClass: "bg-navy-500", cssVar: "var(--color-navy-500)" },
  "#82C9D7": { bgClass: "bg-cyan-500", cssVar: "var(--color-cyan-500)" },
  "#F2CDAC": { bgClass: "bg-yellow-500", cssVar: "var(--color-yellow-500)" },
  "#826CB0": { bgClass: "bg-purple-500", cssVar: "var(--color-purple-500)" },
};

const toCurrency = (n: number) => `$${n.toFixed(2)}`;

export const PotSectionCard = ({
  item,
  index,
  onEdit,
  onDelete,
  onAddMoney,
  onWithdraw,
}: {
  item: PotItem;
  index: number;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  onAddMoney: (index: number) => void;
  onWithdraw: (index: number) => void;
}) => {
  const color = COLOR_MAP[item.theme] ?? {
    bgClass: "bg-grey-300",
    cssVar: "var(--color-grey-300)",
  };
  const pct = Math.min((item.total / item.target) * 100, 100);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="pot-card">
      <header className="row-between">
        <div className="flex items-center gap-2">
          <span className={`dot-2 ${color.bgClass}`} />
          <h3 className="text-preset-3 text-grey-900">{item.name}</h3>
        </div>
        <div className="relative">
          <button
            aria-label="Pot actions"
            onClick={() => setMenuOpen((v) => !v)}
            className="p-2 rounded-lg hover:bg-grey-100"
          >
            <IconEllipsis className="w-4 h-4 text-grey-300" />
          </button>
          {menuOpen && (
            <div
              className="action-menu"
              onMouseLeave={() => setMenuOpen(false)}
            >
              <button
                className="action-menu-item"
                onClick={() => {
                  onEdit(index);
                  setMenuOpen(false);
                }}
              >
                Edit Pot
              </button>
              <button
                className="action-menu-item text-red-500"
                onClick={() => {
                  onDelete(index);
                  setMenuOpen(false);
                }}
              >
                Delete Pot
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="row-between">
        <span className="text-preset-4 text-grey-500">Total Saved</span>
        <span className="text-preset-1 text-grey-900">
          {toCurrency(item.total)}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="progress-track">
          <div
            className="h-full rounded-full"
            style={{ width: `${pct}%`, backgroundColor: color.cssVar }}
          />
        </div>
        <div className="row-between">
          <span className="text-preset-5 text-grey-500">{pct.toFixed(1)}%</span>
          <span className="text-preset-5 text-grey-500">
            Target of {toCurrency(item.target)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button className="btn-soft" onClick={() => onAddMoney(index)}>
          + Add Money
        </button>
        <button className="btn-soft" onClick={() => onWithdraw(index)}>
          Withdraw
        </button>
      </div>
    </section>
  );
};
