import { MenuItem } from "../types/navigation";
import {
  IconNavBudgets,
  IconNavOverview,
  IconNavPots,
  IconNavRecurringBills,
  IconNavTransactions,
} from "@/src/shared/ui/icons/index";

export const NAVIGATION_MENU_ITEMS: MenuItem[] = [
  {
    id: "overview",
    label: "Overview",
    icon: IconNavOverview,
    active: true,
    href: "/",
  },
  {
    id: "transactions",
    label: "Transactions",
    icon: IconNavTransactions,
    active: false,
    href: "/transactions",
  },
  {
    id: "budgets",
    label: "Budgets",
    icon: IconNavBudgets,
    active: false,
    href: "/budgets",
  },
  {
    id: "pots",
    label: "Pots",
    icon: IconNavPots,
    active: false,
    href: "/pots",
  },
  {
    id: "recurring-bills",
    label: "Recurring Bills",
    icon: IconNavRecurringBills,
    active: false,
    href: "/recurring-bills",
  },
];
