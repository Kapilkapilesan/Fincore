export const LOAN_STATUSES = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  DEFAULTED: 'defaulted',
} as const;

export const CUSTOMER_STATUSES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
} as const;

export const COLLECTION_STATUSES = {
  PENDING: 'pending',
  COLLECTED: 'collected',
  OVERDUE: 'overdue',
} as const;

export type LoanStatus = typeof LOAN_STATUSES[keyof typeof LOAN_STATUSES];
export type CustomerStatus = typeof CUSTOMER_STATUSES[keyof typeof CUSTOMER_STATUSES];
export type CollectionStatus = typeof COLLECTION_STATUSES[keyof typeof COLLECTION_STATUSES];










