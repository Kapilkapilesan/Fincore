import { api } from './api';

export async function generateReport(type: string, params?: {
  startDate?: string;
  endDate?: string;
  branchId?: string;
}): Promise<any> {
  const queryParams = new URLSearchParams();
  queryParams.append('type', type);
  if (params?.startDate) queryParams.append('start_date', params.startDate);
  if (params?.endDate) queryParams.append('end_date', params.endDate);
  if (params?.branchId) queryParams.append('branch_id', params.branchId);

  const response = await api.get<any>(`/reports?${queryParams.toString()}`);
  return response.data!;
}

export async function downloadReport(type: string, params?: {
  startDate?: string;
  endDate?: string;
  branchId?: string;
}): Promise<Blob> {
  const queryParams = new URLSearchParams();
  queryParams.append('type', type);
  if (params?.startDate) queryParams.append('start_date', params.startDate);
  if (params?.endDate) queryParams.append('end_date', params.endDate);
  if (params?.branchId) queryParams.append('branch_id', params.branchId);

  const token = typeof window !== 'undefined' ? localStorage.getItem('lms_token') : null;
  const headers: HeadersInit = {
    'Authorization': `Bearer ${token}`,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/reports/download?${queryParams.toString()}`,
    { headers }
  );

  return response.blob();
}








