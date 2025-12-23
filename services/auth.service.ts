import { api } from './api';
import type { User } from '@/types/user';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/auth/login', credentials);
  
  if (response.data) {
    localStorage.setItem('lms_token', response.data.token);
    localStorage.setItem('lms_user', JSON.stringify(response.data.user));
  }
  
  return response.data!;
}

export function logout(): void {
  localStorage.removeItem('lms_token');
  localStorage.removeItem('lms_user');
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  const savedUser = localStorage.getItem('lms_user');
  return savedUser ? JSON.parse(savedUser) : null;
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('lms_token');
}

export async function forgotPassword(email: string): Promise<void> {
  await api.post('/auth/forgot-password', { email });
}

export async function resetPassword(token: string, password: string): Promise<void> {
  await api.post('/auth/reset-password', { token, password });
}










