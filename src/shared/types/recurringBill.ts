export type RecurringBillItem = {
  id: number;
  name: string;
  totalAmountExpenses: number;
  lastTransaction?: string;
};

export type RecurringSummary = {
  TotalAmountDueSoonBills: number;
  TotalAmountPaidBills: number;
  TotalAmountUpcomingBills: number;
  TotalDueSoonBills: number;
  TotalPaidBills: number;
  TotalUpcomingBills: number;
  totalBills: number;
};

export type RecurringItemList = {
  amount: number;
  contactAvatarUrl: string;
  contactName: string;
  dueDate: string;
  id: number;
  status: string;
};
