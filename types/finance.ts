export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  branchId?: string;
  category: string;
  createdAt?: string;
}

export interface FinanceOverview {
  totalFunds: number;
  totalLoans: number;
  totalCollections: number;
  totalExpenses: number;
  pendingApprovals: number;
}








