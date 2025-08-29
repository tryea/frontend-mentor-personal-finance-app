"use client";

import React from "react";
import Image from "next/image";
import { MenuItem } from "../../types/navigation";
import { NAVIGATION_MENU_ITEMS } from "../../constants/navigation";
import { useSidebar } from "../../contexts/SidebarContext";
import { usePathname } from "next/navigation";
import { IconMinimizeMenu } from "../icons";
import Link from "next/link";

interface NavigationItemProps {
  item: MenuItem;
  isMinimized: boolean;
}

function NavigationItem({ item, isMinimized }: NavigationItemProps) {
  const Icon = item.icon;
  const pathname = usePathname();
  const active = item.href ? pathname === item.href : false;

  return (
    <li>
      <div
        className="sidebar-menu-item"
        data-active={active}
        data-minimized={isMinimized}
      >
        <div>
          <Icon />
        </div>

        <span>{item.label}</span>

        {!!active && (
          <div className="h-full absolute left-0 top-0 w-1 bg-green-500" />
        )}
      </div>
    </li>
  );
}

export default function Sidebar() {
  const { isMinimized, toggleMinimize } = useSidebar();

  return (
    <div className={`sidebar`} data-minimized={isMinimized}>
      {/* Logo */}
      <div className="sidebar-header" data-minimized={isMinimized}>
        <Image
          src={isMinimized ? "/logo/logo-small.svg" : "/logo/logo-large.svg"}
          alt="Finance App Logo"
          width={isMinimized ? 12.48 : 121.45}
          height={isMinimized ? 21.44 : 21.76}
        />
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1">
        <ul className="sidebar-menu-list">
          {NAVIGATION_MENU_ITEMS.map((item: MenuItem) => {
            if (item.href) {
              return (
                <Link key={item.id} href={item.href} className="w-full h-full">
                  <NavigationItem item={item} isMinimized={isMinimized} />
                </Link>
              );
            }

            return (
              <NavigationItem
                key={item.id}
                item={item}
                isMinimized={isMinimized}
              />
            );
          })}
        </ul>
      </nav>

      {/* Minimize Toggle */}
      <button
        onClick={toggleMinimize}
        className={`sidebar-expand-toggle`}
        data-minimized={isMinimized}
      >
        <div>
          <IconMinimizeMenu />
        </div>
        <span>Minimize Menu</span>
      </button>
    </div>
  );
}
