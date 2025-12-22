export interface Collection {
  id: string;
  loanId: string;
  loan?: {
    id: string;
    customerId: string;
    customer?: {
      id: string;
      name: string;
    };
  };
  amount: number;
  dueDate: string;
  collectedAt?: string;
  status: 'pending' | 'collected' | 'overdue';
  collectedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}








