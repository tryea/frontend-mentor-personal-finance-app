import Link from "next/link";
import React from "react";

type Props = {
  footerText: string;
  linkText: string;
  linkHref: string;
};

const AuthFooter = ({ footerText, linkText, linkHref }: Props) => {
  return (
    <div className="text-grey-500 text-preset-4 flex gap-2 w-full justify-center">
      {footerText}
      <Link
        href={linkHref}
        className="text-grey-900 text-preset-4-bold underline"
      >
        {linkText}
      </Link>
    </div>
  );
};

export default AuthFooter;
