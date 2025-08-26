import { ComponentType, SVGProps } from "react";

export interface MenuItem {
  id: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  active: boolean;
  href?: string;
}

// SidebarProps removed - now using Context API instead

export interface NavigationConfig {
  menuItems: MenuItem[];
}
