export interface Loan {
  id: string;
  customerId: string;
  customer?: {
    id: string;
    name: string;
  };
  amount: number;
  interestRate: number;
  term: number;
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'completed' | 'defaulted';
  approvedBy?: string;
  approvedAt?: string;
  disbursedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}








