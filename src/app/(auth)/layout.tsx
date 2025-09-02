import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr] lg:flex lg:flex-row min-h-dvh max-h-dvh bg-beige-100">
      <div className="bg-grey-900 px-10 py-6 flex flex-row items-center justify-center rounded-b-lg lg:hidden">
        <img src="/logo/logo-large.svg" alt="logo" />
      </div>

      <div className="hidden lg:flex p-5 max-h-full min-h-0 rounded-xl min-w-0 w-fit">
        <img
          className="rounded-xl h-full object-contain"
          src={"/illustrations/illustration-authentication.svg"}
          alt="illustration"
        />
      </div>

      <div className="min-w-0 min-h-0 w-full h-full flex flex-col items-center justify-center p-4 md:p-8">
        {children}
      </div>
    </div>
  );
}
