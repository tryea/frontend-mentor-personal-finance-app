"use client";
import React from "react";

export const PotsDeletePotModal = ({
  open,
  onClose,
  onConfirm,
  name,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  name: string;
}) => {
  if (!open) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal>
      <div className="modal-panel">
        <header className="modal-header">
          <h2 className="text-preset-2 text-grey-900">{`Delete ‘${name}’?`}</h2>
          <button aria-label="Close" onClick={onClose} className="text-grey-500">×</button>
        </header>

        <p className="text-preset-5 text-grey-500 mt-2">
          Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever.
        </p>

        <div className="mt-6 flex flex-col gap-4">
          <button onClick={onConfirm} className="btn-danger">Yes, Confirm Deletion</button>
          <button onClick={onClose} className="btn-link">No, Go Back</button>
        </div>
      </div>
    </div>
  );
};