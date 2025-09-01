"use client";
import React from "react";

interface SignUpFormFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

export const SignUpFormField = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  required = false,
}: SignUpFormFieldProps) => {
  return (
    <div className="form-field">
      <label className="text-preset-4-bold text-grey-900">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="input-text focus:border-grey-900"
      />
      {type === "password" && value.length > 0 && value.length < 8 && (
        <p className="text-preset-5 text-grey-500 mt-1">
          Passwords must be at least 8 characters
        </p>
      )}
    </div>
  );
};