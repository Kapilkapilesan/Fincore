import { api } from './api';
import type { Customer } from '@/types/customer';

export async function getCustomers(params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<{ data: Customer[]; total: number }> {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.search) queryParams.append('search', params.search);

  const response = await api.get<{ data: Customer[]; total: number }>(
    `/customers?${queryParams.toString()}`
  );
  return response.data!;
}

export async function getCustomerById(id: string): Promise<Customer> {
  const response = await api.get<Customer>(`/customers/${id}`);
  return response.data!;
}

export async function createCustomer(customer: Partial<Customer>): Promise<Customer> {
  const response = await api.post<Customer>('/customers', customer);
  return response.data!;
}

export async function updateCustomer(id: string, customer: Partial<Customer>): Promise<Customer> {
  const response = await api.put<Customer>(`/customers/${id}`, customer);
  return response.data!;
}

export async function deleteCustomer(id: string): Promise<void> {
  await api.delete(`/customers/${id}`);
}








