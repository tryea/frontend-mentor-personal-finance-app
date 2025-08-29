import { TransactionListHeader } from './components/TransactionListHeader';
import { TransactionTable } from './components/TransactionTable';

export const TransactionListScreen = () => {
  return (
    <div className="flex flex-col gap-8">
      <TransactionListHeader />
      <TransactionTable />
    </div>
  );
};