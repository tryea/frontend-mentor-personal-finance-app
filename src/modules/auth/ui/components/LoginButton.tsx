import React from "react";

type LoginButtonProps = {
  isValid: boolean;
  isLoading: boolean;
  text: string;
};

export const LoginButton = ({
  isValid,
  isLoading,
  text,
}: LoginButtonProps) => {
  return (
    <button
      type="submit"
      disabled={!isValid || isLoading}
      className="btn-primary w-full disabled:opacity-50"
    >
      {isLoading ? "Signing in..." : text}
    </button>
  );
};