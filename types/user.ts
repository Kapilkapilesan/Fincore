export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Admin' | 'Manager' | 'Staff' | 'Cashier';
  branch?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}








