export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone: string;
  address?: string;
  branchId?: string;
  centerId?: string;
  groupId?: string;
  status: 'active' | 'inactive' | 'suspended';
  createdAt?: string;
  updatedAt?: string;
}








