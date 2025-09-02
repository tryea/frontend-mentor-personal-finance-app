import React from "react";

type Props = {
  title: string;
};

const AuthHeader = ({ title }: Props) => {
  return (
    <div className="text-preset-1 text-grey-900 flex justify-start">
      {title}
    </div>
  );
};

export default AuthHeader;
