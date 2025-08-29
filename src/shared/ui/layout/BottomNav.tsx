"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVIGATION_MENU_ITEMS } from "@/src/shared/constants/navigation";
import type { MenuItem } from "@/src/shared/types/navigation";

interface BottomNavItemProps {
  item: MenuItem;
}

function BottomNavItem({ item }: BottomNavItemProps) {
  const Icon = item.icon;
  const pathname = usePathname();
  const active = item.href ? pathname === item.href : false;

  return (
    <li>
      <div className="bottom-nav-menu-item" data-active={active}>
        <div>
          <Icon />
        </div>

        <span>{item.label}</span>

        {!!active && (
          <div className="h-1 absolute left-0 bottom-0 w-full bg-green-500" />
        )}
      </div>
    </li>
  );
}

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <ul className="grid grid-cols-5 gap-0 md:gap-[42px]">
        {NAVIGATION_MENU_ITEMS.map((item: MenuItem) => {
          if (item.href) {
            return (
              <Link key={item.id} href={item.href} className="w-full h-full">
                <BottomNavItem item={item} />
              </Link>
            );
          }

          return <BottomNavItem key={item.id} item={item} />;
        })}
      </ul>
    </nav>
  );
}
