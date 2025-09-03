"use client";
import { IconCaretDown } from "@/shared/ui/icons";
import React, { useMemo, useState } from "react";

export type AddBudgetPayload = {
  category: string;
  maximum: number;
  theme: string; // hex string chosen from allowed tokens mapping
};

export const BudgetsAddBudgetModal = ({
  open,
  onClose,
  onSubmit,
  existingCategories,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: AddBudgetPayload) => void;
  existingCategories: string[];
}) => {
  const [category, setCategory] = useState("");
  const [maximum, setMaximum] = useState<string>("");
  const [theme, setTheme] = useState<string>("#277C78");

  const categoryOptions = useMemo(() => {
    const all = ["Entertainment", "Bills", "Dining Out", "Personal Care"];
    return all.filter((c) => !existingCategories.includes(c));
  }, [existingCategories]);

  const themes: { name: string; value: string; dot: string }[] = [
    { name: "Green", value: "#277C78", dot: "bg-green-500" },
    { name: "Cyan", value: "#82C9D7", dot: "bg-cyan-500" },
    { name: "Yellow", value: "#F2CDAC", dot: "bg-yellow-500" },
    { name: "Navy", value: "#626070", dot: "bg-navy-500" },
  ];

  const valid = category && maximum !== "" && Number(maximum) > 0;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    onSubmit({ category, maximum: Number(maximum), theme });
    onClose();
    setCategory("");
    setMaximum("");
    setTheme("#277C78");
  };

  if (!open) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal>
      <div className="modal-panel">
        <header className="modal-header">
          <h2 className="text-preset-2 text-grey-900">Add New Budget</h2>
          <button
            aria-label="Close"
            onClick={onClose}
            className="text-grey-500"
          >
            ×
          </button>
        </header>

        <p className="text-preset-5 text-grey-500 mt-2">
          Choose a category to set a spending budget. These categories can help
          you monitor spending.
        </p>

        <form onSubmit={submit} className="stack-6 mt-6">
          <div className="form-field">
            <label className="text-preset-5 text-grey-500">
              Budget Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-select w-full"
              >
                <option value="" disabled>
                  Select category
                </option>
                {categoryOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <IconCaretDown
                width={16}
                height={16}
                className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>

          <div className="form-field">
            <label className="text-preset-5 text-grey-500">Maximum Spend</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-grey-500">
                $
              </span>
              <input
                inputMode="decimal"
                value={maximum}
                onChange={(e) =>
                  setMaximum(e.target.value.replace(/[^0-9.]/g, ""))
                }
                className="input-text w-full pl-7"
                placeholder="$"
              />
            </div>
          </div>

          <div className="form-field">
            <label className="text-preset-5 text-grey-500">Theme</label>
            <div className="relative">
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="input-select w-full"
              >
                {themes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.name}
                  </option>
                ))}
              </select>
              <IconCaretDown
                width={16}
                height={16}
                className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2"
              />
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`dot-2 ${
                  themes.find((t) => t.value === theme)?.dot ?? "bg-grey-300"
                }`}
              />
              <span className="text-preset-4 text-grey-900">
                {themes.find((t) => t.value === theme)?.name}
              </span>
            </div>
          </div>

          <button disabled={!valid} className="btn-primary disabled:opacity-50">
            Add Budget
          </button>
        </form>
      </div>
    </div>
  );
};
