export type TransactionType = "INCOME" | "EXPENSE";

export type TransactionItem = {
  id: number;
  contactName: string;
  contactAvatarUrl?: string;
  amount: number;
  type: TransactionType;
  transactionDate: string;
  createdAt?: string;
};
