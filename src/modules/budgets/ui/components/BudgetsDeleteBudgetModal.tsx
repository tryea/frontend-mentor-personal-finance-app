"use client";
import React from "react";

export const BudgetsDeleteBudgetModal = ({
  open,
  onClose,
  onConfirm,
  category,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  category: string | null;
}) => {
  if (!open || !category) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal>
      <div className="modal-panel">
        <header className="modal-header">
          <h2 className="text-preset-2 text-grey-900">Delete ‘{category}’?</h2>
          <button aria-label="Close" onClick={onClose} className="text-grey-500">×</button>
        </header>

        <p className="text-preset-5 text-grey-500 mt-2">
          Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever.
        </p>

        <div className="btn-group mt-6">
          <button className="btn-danger" onClick={onConfirm}>Yes, Confirm Deletion</button>
          <button className="btn-soft" onClick={onClose}>No, Go Back</button>
        </div>
      </div>
    </div>
  );
};