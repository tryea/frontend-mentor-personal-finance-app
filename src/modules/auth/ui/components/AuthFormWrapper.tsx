import React from "react";

type Props = {
  children: React.ReactNode;
  onSubmit: () => {};
};

const AuthFormWrapper = ({ children, onSubmit }: Props) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full">
      {children}
    </form>
  );
};

export default AuthFormWrapper;
