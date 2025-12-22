export const ROLES = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Admin',
  MANAGER: 'Manager',
  STAFF: 'Staff',
  CASHIER: 'Cashier',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];








