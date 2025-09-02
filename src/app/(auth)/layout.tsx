import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr] lg:flex lg:flex-row min-h-dvh max-h-dvh min-w-dvw max-w-dvw bg-beige-100">
      <div className="bg-grey-900 px-10 py-6 flex flex-row items-center justify-center rounded-b-lg lg:hidden">
        <img src="/logo/logo-large.svg" alt="logo" />
      </div>

      <div className="hidden lg:flex p-5 max-h-full min-h-0 rounded-xl shrink-0 w-[calc(((100dvh_-_40px)_*_365_/_599)_+_40px)] ">
        <img
          className="rounded-xl h-full aspect-[365/599]"
          src={"/illustrations/illustration-authentication.svg"}
          alt="illustration"
        />
      </div>

      <div className="min-w-0 min-h-0 w-full h-full lg:h-dvh flex flex-col flex-1 items-center justify-center p-4 md:p-8 grow">
        {children}
      </div>
    </div>
  );
}
