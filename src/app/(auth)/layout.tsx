import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="min-h-dvh flex items-center justify-center p-6">{children}</section>;
}