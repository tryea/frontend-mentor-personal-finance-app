"use client";
import { IconCaretDown } from "@/shared/ui/icons";
import React, { useEffect, useState } from "react";
import type { PotItem } from "@/shared/types/pots";

export type EditPotPayload = {
  name: string;
  target: number;
  theme: string;
};

type Theme = {
  id: number;
  name: string;
  hexCode: string;
};

export const PotsEditPotModal = ({
  open,
  onClose,
  onSubmit,
  initial,
  themes = [],
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: EditPotPayload) => void;
  initial?: PotItem | null;
  themes?: Theme[];
}) => {
  const [name, setName] = useState("");
  const [target, setTarget] = useState<string>("");
  const [theme, setTheme] = useState<string>("#277C78");

  useEffect(() => {
    if (open && initial) {
      setName(initial.name);
      setTarget(String(initial.targetAmount));
      setTheme(initial.hexCode ?? (themes[0]?.hexCode || "#277C78"));
    }
  }, [open, initial, themes]);

  const NAME_LIMIT = 30;
  const remaining = Math.max(NAME_LIMIT - name.length, 0);

  // Use themes from props instead of hardcoded array

  const valid = name.trim().length > 0 && target !== "" && Number(target) > 0;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    onSubmit({ name: name.trim(), target: Number(target), theme });
  };

  if (!open || !initial) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal>
      <div className="modal-panel">
        <header className="modal-header">
          <h2 className="text-preset-2 text-grey-900">Edit Pot</h2>
          <button
            aria-label="Close"
            onClick={onClose}
            className="text-grey-500"
          >
            ×
          </button>
        </header>

        <p className="text-preset-5 text-grey-500 mt-2">
          If your saving targets change, feel free to update your pots.
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
              {remaining} of 30 characters left
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
                  <option key={t.hexCode} value={t.hexCode}>
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
                className="dot-2"
                style={{
                  backgroundColor: theme,
                }}
              />
              <span className="text-preset-4 text-grey-900">
                {themes.find((t) => t.hexCode === theme)?.name || 'Unknown'}
              </span>
            </div>
          </div>

          <button disabled={!valid} className="btn-primary disabled:opacity-50">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};
