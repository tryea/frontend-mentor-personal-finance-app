"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVIGATION_MENU_ITEMS } from "@/src/shared/constants/navigation";
import type { MenuItem } from "@/src/shared/types/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[var(--ds-sidebar-bg)] text-white border-t border-[color-mix(in_srgb,var(--ds-sidebar-bg),white_10%)]">
      <ul className="grid grid-cols-5">
        {NAVIGATION_MENU_ITEMS.map((item: MenuItem) => {
          const active = item.href ? pathname === item.href : false;
          return (
            <li key={item.id}>
              {item.href ? (
                <Link
                  href={item.href}
                  className={`flex flex-col items-center justify-center py-3 gap-1 text-xs ${
                    active ? "text-[#277c78]" : "text-(--ds-grey-300)"
                  }`}
                >
                  <span className={`w-5 h-5 ${active ? "text-[#277c78]" : ""}`}>
                    <item.icon />
                  </span>
                  <span className="sr-only sm:not-sr-only sm:text-[11px]">
                    {item.label}
                  </span>
                </Link>
              ) : (
                <div className="py-3" />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}