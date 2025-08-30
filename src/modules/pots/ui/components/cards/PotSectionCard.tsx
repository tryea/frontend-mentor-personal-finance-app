import React from "react";
import { PotItem } from "../../PotsScreen";

const COLOR_MAP: Record<string, { bgClass: string; cssVar: string }> = {
  "#277C78": { bgClass: "bg-green-500", cssVar: "var(--color-green-500)" },
  "#626070": { bgClass: "bg-navy-500", cssVar: "var(--color-navy-500)" },
  "#82C9D7": { bgClass: "bg-cyan-500", cssVar: "var(--color-cyan-500)" },
  "#F2CDAC": { bgClass: "bg-yellow-500", cssVar: "var(--color-yellow-500)" },
  "#826CB0": { bgClass: "bg-purple-500", cssVar: "var(--color-purple-500)" },
};

const toCurrency = (n: number) => `$${n.toFixed(2)}`;

export const PotSectionCard = ({ item }: { item: PotItem }) => {
  const color = COLOR_MAP[item.theme] ?? { bgClass: "bg-grey-300", cssVar: "var(--color-grey-300)" };
  const pct = Math.min((item.total / item.target) * 100, 100);
  return (
    <section className="pot-card">
      <header className="row-between">
        <div className="pot-header-left">
          <span className={`dot-2 ${color.bgClass}`} />
          <h3 className="text-preset-3 text-grey-900">{item.name}</h3>
        </div>
        <button aria-label="more" className="text-grey-500">...</button>
      </header>

      <div className="pot-amount-row">
        <span className="text-preset-4 text-grey-500">Total Saved</span>
        <span className="text-preset-1 text-grey-900">{toCurrency(item.total)}</span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="progress-track">
          <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color.cssVar }} />
        </div>
        <div className="pot-meta-row">
          <span className="text-preset-5 text-grey-500">{pct.toFixed(1)}%</span>
          <span className="text-preset-5 text-grey-500">Target of {toCurrency(item.target)}</span>
        </div>
      </div>

      <div className="btn-group">
        <button className="btn-soft">+ Add Money</button>
        <button className="btn-soft opacity-60">Withdraw</button>
      </div>
    </section>
  );
};