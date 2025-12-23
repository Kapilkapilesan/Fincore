import { api } from './api';
import type { Loan } from '@/types/loan';

export async function getLoans(params?: {
  page?: number;
  limit?: number;
  status?: string;
  customerId?: string;
}): Promise<{ data: Loan[]; total: number }> {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.status) queryParams.append('status', params.status);
  if (params?.customerId) queryParams.append('customer_id', params.customerId);

  const response = await api.get<{ data: Loan[]; total: number }>(
    `/loans?${queryParams.toString()}`
  );
  return response.data!;
}

export async function getLoanById(id: string): Promise<Loan> {
  const response = await api.get<Loan>(`/loans/${id}`);
  return response.data!;
}

export async function createLoan(loan: Partial<Loan>): Promise<Loan> {
  const response = await api.post<Loan>('/loans', loan);
  return response.data!;
}

export async function updateLoan(id: string, loan: Partial<Loan>): Promise<Loan> {
  const response = await api.put<Loan>(`/loans/${id}`, loan);
  return response.data!;
}

export async function approveLoan(id: string): Promise<Loan> {
  const response = await api.post<Loan>(`/loans/${id}/approve`);
  return response.data!;
}

export async function rejectLoan(id: string, reason: string): Promise<Loan> {
  const response = await api.post<Loan>(`/loans/${id}/reject`, { reason });
  return response.data!;
}










