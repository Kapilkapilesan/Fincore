import { api } from './api';
import type { Collection } from '@/types/collection';

export async function getDueList(params?: {
  page?: number;
  limit?: number;
  date?: string;
}): Promise<{ data: Collection[]; total: number }> {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.date) queryParams.append('date', params.date);

  const response = await api.get<{ data: Collection[]; total: number }>(
    `/collections/due-list?${queryParams.toString()}`
  );
  return response.data!;
}

export async function getCollections(params?: {
  page?: number;
  limit?: number;
  date?: string;
}): Promise<{ data: Collection[]; total: number }> {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.date) queryParams.append('date', params.date);

  const response = await api.get<{ data: Collection[]; total: number }>(
    `/collections?${queryParams.toString()}`
  );
  return response.data!;
}

export async function createCollection(collection: Partial<Collection>): Promise<Collection> {
  const response = await api.post<Collection>('/collections', collection);
  return response.data!;
}

export async function getCollectionSummary(params?: {
  startDate?: string;
  endDate?: string;
}): Promise<any> {
  const queryParams = new URLSearchParams();
  if (params?.startDate) queryParams.append('start_date', params.startDate);
  if (params?.endDate) queryParams.append('end_date', params.endDate);

  const response = await api.get<any>(
    `/collections/summary?${queryParams.toString()}`
  );
  return response.data!;
}








