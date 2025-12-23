import { api } from './api';

export async function getFinanceOverview(): Promise<any> {
  const response = await api.get<any>('/finance/overview');
  return response.data!;
}

export async function getFundTransactions(params?: {
  page?: number;
  limit?: number;
}): Promise<{ data: any[]; total: number }> {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());

  const response = await api.get<{ data: any[]; total: number }>(
    `/finance/fund-transactions?${queryParams.toString()}`
  );
  return response.data!;
}

export async function getBranchTransactions(params?: {
  page?: number;
  limit?: number;
  branchId?: string;
}): Promise<{ data: any[]; total: number }> {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.branchId) queryParams.append('branch_id', params.branchId);

  const response = await api.get<{ data: any[]; total: number }>(
    `/finance/branch-transactions?${queryParams.toString()}`
  );
  return response.data!;
}

export async function createFundTransaction(transaction: any): Promise<any> {
  const response = await api.post<any>('/finance/fund-transactions', transaction);
  return response.data!;
}










