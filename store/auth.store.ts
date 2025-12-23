'use client'

import { create } from 'zustand';
import type { User } from '@/types/user';
import { getCurrentUser } from '@/services/auth.service';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => {
    localStorage.removeItem('lms_token');
    localStorage.removeItem('lms_user');
    set({ user: null, isAuthenticated: false });
  },
  initialize: () => {
    const user = getCurrentUser();
    set({ user, isAuthenticated: !!user });
  },
}));










