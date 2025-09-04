import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { ToastProvider } from "@/shared/contexts/ToastContext";
import QueryProvider from "@/shared/providers/QueryProvider";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Personal Finance App",
  description: "A comprehensive personal finance management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${publicSans.variable} font-sans antialiased bg-beige-100`}
        cz-shortcut-listen="true"
      >
        <ClerkProvider>
          <QueryProvider>
            <ToastProvider>{children}</ToastProvider>
          </QueryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
