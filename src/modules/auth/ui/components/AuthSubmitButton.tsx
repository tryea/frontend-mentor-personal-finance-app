import React from "react";

type Props = {
  label: string;
};

const AuthSubmitButton = ({ label }: Props) => {
  return (
    <button className="w-full bg-grey-900 rounded-lg text-white text-preset-4-bold flex items-center justify-center p-4">
      {label}
    </button>
  );
};

export default AuthSubmitButton;
