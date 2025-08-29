import { TransactionListHeader } from "./components/TransactionListHeader";
import { TransactionTable } from "./components/TransactionTable";

export const TransactionListScreen = () => {
  return (
    <>
      <TransactionListHeader />
      <TransactionTable />
    </>
  );
};
