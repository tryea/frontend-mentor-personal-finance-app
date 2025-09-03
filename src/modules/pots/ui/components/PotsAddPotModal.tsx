"use client";
import { IconCaretDown } from "@/shared/ui/icons";
import React, { useState } from "react";

export type AddPotPayload = {
  name: string;
  target: number;
  theme: string;
};

export const PotsAddPotModal = ({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: AddPotPayload) => void;
}) => {
  const [name, setName] = useState("");
  const [target, setTarget] = useState<string>("");
  const [theme, setTheme] = useState<string>("#277C78");

  const NAME_LIMIT = 30;
  const remaining = Math.max(NAME_LIMIT - name.length, 0);

  const themes: { name: string; value: string; dot: string }[] = [
    { name: "Green", value: "#277C78", dot: "bg-green-500" },
    { name: "Navy", value: "#626070", dot: "bg-navy-500" },
    { name: "Cyan", value: "#82C9D7", dot: "bg-cyan-500" },
    { name: "Yellow", value: "#F2CDAC", dot: "bg-yellow-500" },
    { name: "Purple", value: "#826CB0", dot: "bg-purple-500" },
  ];

  const valid = name.trim().length > 0 && target !== "" && Number(target) > 0;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    onSubmit({ name: name.trim(), target: Number(target), theme });
    onClose();
    setName("");
    setTarget("");
    setTheme("#277C78");
  };

  if (!open) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal>
      <div className="modal-panel">
        <header className="modal-header">
          <h2 className="text-preset-2 text-grey-900">Add New Pot</h2>
          <button
            aria-label="Close"
            onClick={onClose}
            className="text-grey-500"
          >
            ×
          </button>
        </header>

        <p className="text-preset-5 text-grey-500 mt-2">
          Create a pot to set savings targets. These can help keep you on track
          as you save for special purchases.
        </p>

        <form onSubmit={submit} className="stack-6 mt-6">
          <div className="form-field">
            <label className="text-preset-5 text-grey-500">Pot Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, NAME_LIMIT))}
              className="input-text w-full"
            />
            <div className="text-right text-preset-5 text-grey-500">
              {remaining} characters left
            </div>
          </div>

          <div className="form-field">
            <label className="text-preset-5 text-grey-500">Target</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-grey-500">
                $
              </span>
              <input
                inputMode="decimal"
                value={target}
                onChange={(e) =>
                  setTarget(e.target.value.replace(/[^0-9.]/g, ""))
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
            Add Pot
          </button>
        </form>
      </div>
    </div>
  );
};
