import React from "react";

type Props = {
  label: string;
  disabled?: boolean;
};

const AuthSubmitButton = ({ label, disabled = false }: Props) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`mt-4 w-full rounded-lg text-white text-preset-4-bold flex items-center justify-center p-4 ${
        disabled
          ? "bg-grey-500 cursor-not-allowed"
          : "bg-grey-900 hover:bg-grey-700"
      }`}
    >
      {label}
    </button>
  );
};

export default AuthSubmitButton;
