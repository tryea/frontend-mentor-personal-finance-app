import { IconHidePassword, IconShowPassword } from "@/src/shared/ui/icons";
import React, { useState } from "react";

type Props = {
  type: "text" | "password";
  label: string;
  placeholder: string;
  note?: string;
};

const AuthFormField = ({ type, label, placeholder, note }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="text-grey-500 text-preset-5-bold">{label}</div>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full text-preset-4 p-2 border border-beige-500 rounded-lg ${
            type === "password" ? "pl-5 pr-13" : "px-5"
          } py-3 placeholder:text-beige-500 text-grey-900`}
        />
        {type === "password" && (
          <div className="absolute top-1/2 right-5 transform -translate-y-1/2">
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
      {note && (
        <div className="text-grey-500 text-preset-5 text-right">{note}</div>
      )}
    </div>
  );
};

export default AuthFormField;
