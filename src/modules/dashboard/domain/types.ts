// Dashboard Overview Domain Types

export interface Balance {
  current: number;
  income: number;
  expenses: number;
}

export interface Transaction {
  id: string;
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
}

export interface Pot {
  id: string;
  name: string;
  target: number;
  total: number;
  theme: string;
}

export interface Budget {
  id: string;
  category: string;
  maximum: number;
  theme: string;
  spent: number;
}

export interface RecurringBill {
  id: string;
  name: string;
  amount: number;
  date: string;
  recurring: boolean;
}

export interface DashboardOverview {
  balance: Balance;
  transactions: Transaction[];
  pots: Pot[];
  budgets: Budget[];
  recurringBills: RecurringBill[];
}

// API Response Types
export interface DashboardOverviewResponse extends DashboardOverview {}

export interface ApiError {
  message: string;
  status: number;
}