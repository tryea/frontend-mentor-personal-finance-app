import React from "react";

type LoginFormFieldProps = {
  label: string;
  type: "email" | "password" | "text";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
};

export const LoginFormField = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  required = false,
}: LoginFormFieldProps) => {
  return (
    <div className="form-field">
      <label className="text-preset-5 text-grey-500">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-text w-full"
        required={required}
      />
    </div>
  );
};