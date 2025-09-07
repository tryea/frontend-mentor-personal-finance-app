"use client";

import React, { useMemo, useState } from "react";
import type { PotItem } from "@/shared/types/pots";
import { currencyFormatter } from "@/shared/utils/formatter";

export const PotsWithdrawMoneyModal = ({
  open,
  pot,
  onClose,
  onConfirm,
}: {
  open: boolean;
  pot?: PotItem;
  onClose: () => void;
  onConfirm: (amount: number) => void;
}) => {
  const [amount, setAmount] = useState<string>("0");

  const numericAmount = useMemo(() => {
    const n = Number(amount);
    return Number.isFinite(n) ? Math.max(0, n) : 0;
  }, [amount]);

  if (!open || !pot) return null;

  const valid = numericAmount > 0 && numericAmount <= pot.totalAmountSaved;
  const newTotal = Math.max(0, pot.totalAmountSaved - numericAmount);
  const pct = Math.min((newTotal / pot.targetAmount) * 100, 100);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    onConfirm(numericAmount);
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal>
      <div className="modal-panel">
        <header className="modal-header">
          <h2 className="text-preset-2 text-grey-900">{`Withdraw from ‘${pot.name}’`}</h2>
          <button
            aria-label="Close"
            onClick={onClose}
            className="text-grey-500"
          >
            ×
          </button>
        </header>

        <p className="text-preset-5 text-grey-500 mt-2">
          Withdraw from your pot to put money back in your main balance. This
          will reduce the amount you have in this pot.
        </p>

        <form onSubmit={submit} className="stack-6 mt-6">
          <div className="form-field">
            <div className="row-between">
              <label className="text-preset-5 text-grey-500">New Amount</label>
              <span className="text-preset-1 text-grey-900">
                {currencyFormatter(newTotal)}
              </span>
            </div>
            <div className="progress-track">
              <div
                className="h-full rounded-full"
                style={{ width: `${pct}%`, backgroundColor: pot.hexCode }}
              />
            </div>
            <div className="row-between">
              <span className="text-preset-5 text-red-500">
                {pct.toFixed(2)}%
              </span>
              <span className="text-preset-5 text-grey-500">
                Target of {currencyFormatter(pot.targetAmount)}
              </span>
            </div>
          </div>

          <div className="form-field">
            <label className="text-preset-5 text-grey-500">
              Amount to Withdraw
            </label>
            <div className="relative">
              <span className="add-money-dollar-prefix">$</span>
              <input
                inputMode="decimal"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value.replace(/[^0-9.]/g, ""))
                }
                className="input-text w-full pl-7"
                placeholder="$"
              />
            </div>
          </div>

          <button disabled={!valid} className="btn-primary disabled:opacity-50">
            Confirm Withdrawal
          </button>
        </form>
      </div>
    </div>
  );
};
