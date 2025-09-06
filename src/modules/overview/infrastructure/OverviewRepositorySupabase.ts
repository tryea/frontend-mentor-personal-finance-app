import { SupabaseClient } from "@supabase/supabase-js";
import { OverviewRepository } from "../domain/OverviewRepository";
import { Overview } from "../domain/types";

export function makeOverviewRepositorySupabase(
  client: SupabaseClient
): OverviewRepository {
  return {
    async getOverview(): Promise<Overview> {
      const { data: userOverview, error } = await client
        .from("user_overview")
        .select("*")
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return {
        userIncome: userOverview.user_income,
        userExpense: userOverview.user_expense,
        userCurrentBalance: userOverview.user_current_balance,
        totalPotSaved: userOverview.total_pot_saved,
        totalBudgetAmountExpenses: userOverview.total_budget_amount_expenses,
        maximumBudgetAmountExpenses:
          userOverview.maximum_budget_amount_expenses,
        recurringTotalDueSoon: userOverview.recurring_total_due_soon,
        recurringTotalPaid: userOverview.recurring_total_paid,
        recurringTotalUpcoming: userOverview.recurring_total_upcoming,
        latest4Budgets: userOverview.latest_4_budgets.map(
          (budget: {
            id: number;
            name: string;
            hex_code: string;
            total_amount_expenses: number;
            created_at: string;
          }) => ({
            id: budget.id,
            name: budget.name,
            hexCode: budget.hex_code,
            totalAmountExpenses: budget.total_amount_expenses,
            createdAt: budget.created_at,
          })
        ),
        latest4Pots: userOverview.latest_4_pots.map(
          (pot: {
            id: number;
            name: string;
            hex_code: string;
            total_amount_saved: number;
          }) => ({
            id: pot.id,
            name: pot.name,
            hexCode: pot.hex_code,
            totalAmountSaved: pot.total_amount_saved,
          })
        ),
        latest4RecurringBills: userOverview.latest_4_recurring_bills,
        latest5Transactions: userOverview.latest_5_transactions.map(
          (transaction: {
            id: number;
            amount: number;
            type: string;
            contact_name: string;
            contact_avatar_url: string;
            transaction_date: string;
          }) => ({
            id: transaction.id,
            amount: transaction.amount,
            type: transaction.type,
            contactName: transaction.contact_name,
            contactAvatarUrl: transaction.contact_avatar_url,
            transactionDate: transaction.transaction_date,
          })
        ),
      };
    },
  };
}
