import { BudgetItem } from "@/shared/types/budget";
import { PotItem } from "@/shared/types/pots";
import { RecurringBillItem } from "@/shared/types/recurringBill";
import { TransactionItem } from "@/shared/types/transaction";

export type Overview = {
  userCurrentBalance: number;
  userExpense: number;
  userIncome: number;
  totalPotSaved: number;
  totalBudgetAmountExpenses: number;
  maximumBudgetAmountExpenses: number;
  recurringTotalDueSoon: number;
  recurringTotalPaid: number;
  recurringTotalUpcoming: number;
  latest4Budgets: Array<BudgetItem>;
  latest4Pots: Array<PotItem>;
  latest4RecurringBills: Array<RecurringBillItem>;
  latest5Transactions: Array<TransactionItem>;
};
