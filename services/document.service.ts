import { api } from './api';

export async function getDocuments(): Promise<any[]> {
  const response = await api.get<any[]>('/documents');
  return response.data!;
}

export async function uploadDocument(file: File, category: string): Promise<any> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('category', category);

  const token = typeof window !== 'undefined' ? localStorage.getItem('lms_token') : null;
  const headers: HeadersInit = {
    'Authorization': `Bearer ${token}`,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/documents`,
    {
      method: 'POST',
      headers,
      body: formData,
    }
  );

  const data = await response.json();
  return data.data;
}

export async function deleteDocument(id: string): Promise<void> {
  await api.delete(`/documents/${id}`);
}

export async function downloadDocument(id: string): Promise<Blob> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('lms_token') : null;
  const headers: HeadersInit = {
    'Authorization': `Bearer ${token}`,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/documents/${id}/download`,
    { headers }
  );

  return response.blob();
}










