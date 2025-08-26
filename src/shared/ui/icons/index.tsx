import type { SVGProps } from "react";
import IconNavBudgetsSVG from "@/src/shared/assets/icons/icon-nav-budgets.svg";
import IconNavOverviewSVG from "@/src/shared/assets/icons/icon-nav-overview.svg";
import IconNavPotsSVG from "@/src/shared/assets/icons/icon-nav-pots.svg";
import IconNavRecurringBillsSVG from "@/src/shared/assets/icons/icon-nav-recurring-bills.svg";
import IconNavTransactionsSVG from "@/src/shared/assets/icons/icon-nav-transactions.svg";

export const IconNavBudgets = (props: SVGProps<SVGSVGElement>) => (
  <IconNavBudgetsSVG {...props} />
);

export const IconNavOverview = (props: SVGProps<SVGSVGElement>) => (
  <IconNavOverviewSVG {...props} />
);

export const IconNavPots = (props: SVGProps<SVGSVGElement>) => (
  <IconNavPotsSVG {...props} />
);

export const IconNavRecurringBills = (props: SVGProps<SVGSVGElement>) => (
  <IconNavRecurringBillsSVG {...props} />
);

export const IconNavTransactions = (props: SVGProps<SVGSVGElement>) => (
  <IconNavTransactionsSVG {...props} />
);
