export interface BudgetItem {
  budget_id: number;
  maximum_amount: number;
  category_name: string;
  theme_name: string;
  theme_color: string;
  total_spent: number;
  latest_transactions: {
    amount: number;
    contact_name: string;
    contact_avatar_url: string;
    date: string;
  }[];
}

export interface TransactionItem {
  avatar?: string;
  name: string;
  category: string;
  date: string;
  amount: number;
}