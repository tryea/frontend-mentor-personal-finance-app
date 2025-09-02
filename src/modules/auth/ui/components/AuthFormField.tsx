import { IconHidePassword, IconShowPassword } from "@/src/shared/ui/icons";
import React, { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  type: "text" | "password";
  label: string;
  placeholder: string;
  note?: string;
  register?: UseFormRegisterReturn;
  error?: string;
  name: string;
};

const AuthFormField = ({
  type,
  label,
  placeholder,
  note,
  register,
  error,
  name,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="text-grey-500 text-preset-5-bold">{label}</div>
      <div className="relative">
        <input
          {...register}
          type={showPassword && type === "password" ? "text" : type}
          placeholder={placeholder}
          className={`w-full text-preset-4 p-2 border rounded-lg ${
            type === "password" ? "pl-5 pr-13" : "px-5"
          } py-3 placeholder:text-beige-500 text-grey-900 ${
            error ? "border-red" : "border-beige-500"
          }`}
        />
        {type === "password" && (
          <div className="absolute top-1/2 right-5 transform -translate-y-1/2 cursor-pointer">
            <button onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <IconShowPassword className="w-4 h-4 text-grey-900" />
              ) : (
                <IconHidePassword className="w-4 h-4 text-grey-900" />
              )}
            </button>
          </div>
        )}
      </div>
      {error && <div className="text-red text-preset-5">{error}</div>}
      {note && !error && (
        <div className="text-grey-500 text-preset-5 text-right">{note}</div>
      )}
    </div>
  );
};

export default AuthFormField;
