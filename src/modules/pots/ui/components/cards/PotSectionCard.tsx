import React, { useState } from "react";
import { PotItem } from "@/shared/types/pots";
import { IconEllipsis } from "@/shared/ui/icons";
import { currencyFormatter } from "@/shared/utils/formatter";

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
  const pct = Math.min((item.totalAmountSaved / item.targetAmount) * 100, 100);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="pot-card">
      <header className="row-between">
        <div className="flex items-center gap-2">
          <span className={`dot-2`} style={{ backgroundColor: item.hexCode }} />
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
          {currencyFormatter(item.totalAmountSaved)}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="progress-track">
          <div
            className="h-full rounded-full"
            style={{ width: `${pct}%`, backgroundColor: item.hexCode }}
          />
        </div>
        <div className="row-between">
          <span className="text-preset-5 text-grey-500">{pct.toFixed(1)}%</span>
          <span className="text-preset-5 text-grey-500">
            Target of {currencyFormatter(item.targetAmount)}
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
