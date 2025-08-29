"use client";

import React from "react";
import Image from "next/image";
import { MenuItem } from "../../types/navigation";
import {
  NAVIGATION_MENU_ITEMS,
  SIDEBAR_CONFIG,
} from "../../constants/navigation";
import { useSidebar } from "../../contexts/SidebarContext";
import { usePathname } from "next/navigation";

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
      <button
        className={`w-full flex flex-row gap-4 items-start px-8 py-4 text-left transition-colors duration-200 relative text-(--ds-grey-300) hover:text-(--ds-grey-100) cursor-pointer  ${
          active
            ? "bg-(--ds-beige-100) hover:bg-(--ds-beige-500) text-(--ds-grey-900) hover:text-(--ds-grey-900) rounded-r-xl"
            : ""
        }`}
      >
        <div className={`w-5 h-5 ${active ? "text-[#277c78]" : ""}`}>
          <Icon className="" />
        </div>
        <span
          className={`text-preset-3 transition-opacity duration-200 ${
            isMinimized ? "opacity-0 hidden" : "opacity-100"
          }`}
        >
          {item.label}
        </span>

        {item.active && (
          <div className="h-full absolute left-0 top-0 w-1 bg-(--ds-accent-green)" />
        )}
      </button>
    </li>
  );
}

export default function Sidebar() {
  const { isMinimized, toggleMinimize } = useSidebar();

  return (
    <div
      className={`sidebar ${SIDEBAR_CONFIG.transitionDuration} ${
        isMinimized
          ? SIDEBAR_CONFIG.minimizedWidth
          : SIDEBAR_CONFIG.expandedWidth
      }`}
    >
      {/* Logo */}
      <div className="sidebar-logo">
        <Image
          src={isMinimized ? "/logo/logo-small.svg" : "/logo/logo-large.svg"}
          alt="Finance App Logo"
          width={isMinimized ? 12.48 : 121.45}
          height={isMinimized ? 21.44 : 21.76}
          className=""
        />
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1">
        <ul className="flex flex-col gap-1 pr-6">
          {NAVIGATION_MENU_ITEMS.map((item: MenuItem) => (
            <NavigationItem
              key={item.id}
              item={item}
              isMinimized={isMinimized}
            />
          ))}
        </ul>
      </nav>

      {/* Minimize Toggle */}
      <button onClick={toggleMinimize} className={`sidebar-expand-toggle`}>
        <Image
          src="/icons/icon-minimize-menu.svg"
          alt="Minimize menu icon"
          width={20}
          height={20}
          className={`mr-4 filter brightness-0 invert ${
            isMinimized ? "rotate-180" : ""
          } transition-transform duration-200`}
        />
        <span
          className={`transition-opacity duration-200 ${
            isMinimized ? "opacity-0 hidden" : "opacity-100"
          }`}
        >
          Minimize Menu
        </span>
      </button>
    </div>
  );
}
