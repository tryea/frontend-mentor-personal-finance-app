import React, { useState } from "react";
import { TransactionItem } from "../BudgetsScreen";
import { IconEllipsis } from "@/shared/ui/icons";

type Item = {
  category: string;
  maximum: number;
  spent: number;
  free: number;
  latest: TransactionItem[];
  color: { bgClass: string; cssVar: string };
};

export const BudgetList = ({
  items,
  toCurrency,
  onEdit,
  onDelete,
}: {
  items: Item[];
  toCurrency: (n: number) => string;
  onEdit?: (index: number) => void;
  onDelete?: (index: number) => void;
}) => {
  const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);

  const toggleMenu = (index: number) => {
    setMenuOpenIndex((prev) => (prev === index ? null : index));
  };

  const closeMenu = () => setMenuOpenIndex(null);

  return (
    <div className="flex flex-col gap-6">
      {items.map((b, index) => (
        <section key={b.category} className="card stack-6">
          <header className="row-between">
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${b.color.bgClass}`} />
              <h3 className="text-preset-3 text-grey-900">{b.category}</h3>
            </div>
            <div className="flex items-center gap-3 relative">
              <span className="text-preset-5 text-grey-500">
                Maximum of ${b.maximum.toFixed(2)}
              </span>
              {(onEdit || onDelete) && (
                <div className="relative">
                  <button
                    aria-label="Budget actions"
                    onClick={() => toggleMenu(index)}
                    className="p-2 rounded-lg hover:bg-grey-100"
                  >
                    <IconEllipsis className="w-4 h-4 text-grey-300" />
                  </button>
                  {menuOpenIndex === index && (
                    <div className="action-menu" onMouseLeave={closeMenu}>
                      {onEdit && (
                        <button
                          className="action-menu-item"
                          onClick={() => {
                            onEdit(index);
                            closeMenu();
                          }}
                        >
                          Edit Budget
                        </button>
                      )}
                      {onDelete && (
                        <button
                          className="action-menu-item"
                          onClick={() => {
                            onDelete(index);
                            closeMenu();
                          }}
                        >
                          Delete Budget
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </header>

          <div className="flex flex-col gap-2">
            <div className="progress-track">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(b.spent / b.maximum) * 100}%`,
                  backgroundColor: b.color.cssVar,
                }}
              />
            </div>
            <div className="row-between">
              <div className="text-preset-4 text-grey-500">Spent</div>
              <div className="text-preset-4 text-grey-900">
                {toCurrency(b.spent)}
              </div>
            </div>
          </div>

          <div className="divider-h" />

          <div className="row-between">
            <div className="text-preset-4 text-grey-500">Remaining</div>
            <div className="text-preset-4 text-grey-900">
              {toCurrency(b.free)}
            </div>
          </div>

          <div className="divider-h" />

          <div className="row-between">
            <div className="text-preset-3 text-grey-900">Latest Spending</div>
            <button className="text-preset-5-bold text-grey-500">
              See All
            </button>
          </div>

          <ul className="flex flex-col">
            {b.latest.map((t, idx) => (
              <li
                key={`${t.name}-${idx}`}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center gap-3">
                  {t.avatar ? (
                    <img
                      className="h-6 w-6 rounded-full"
                      src={t.avatar}
                      alt=""
                    />
                  ) : (
                    <div className="h-6 w-6 rounded-full bg-grey-100" />
                  )}
                  <span className="text-preset-4 text-grey-900">{t.name}</span>
                </div>
                <div className="text-preset-4 text-grey-900">
                  -{toCurrency(Math.abs(t.amount))}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};
