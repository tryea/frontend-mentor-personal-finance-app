import React from "react";

type Props = {
  children: React.ReactNode;
};

const AuthFormWrapper = ({ children }: Props) => {
  return <div className="flex flex-col gap-4 w-full">{children}</div>;
};

export default AuthFormWrapper;
