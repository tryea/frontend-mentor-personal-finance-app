"use client";
import React from "react";

interface SignUpButtonProps {
  isValid: boolean;
  isLoading: boolean;
  text: string;
}

export const SignUpButton = ({ isValid, isLoading, text }: SignUpButtonProps) => {
  return (
    <button
      type="submit"
      disabled={!isValid || isLoading}
      className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? "Creating Account..." : text}
    </button>
  );
};