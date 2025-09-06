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

export type TransactionItemTable = {
  id: number;
  categories: {
    name: string;
  };
  contacts: {
    name: string;
    avatar: string;
  };
  amount: number;
  type: TransactionType;
  date: string;
  recurring: boolean;
};
