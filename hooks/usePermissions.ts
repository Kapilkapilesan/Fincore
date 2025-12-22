'use client'

import { useAuth } from './useAuth';
import { ROLES } from '@/constants/roles';

export function usePermissions() {
  const { user } = useAuth();

  const hasRole = (role: string): boolean => {
    return user?.role === role;
  };

  const hasAnyRole = (roles: string[]): boolean => {
    return user ? roles.includes(user.role) : false;
  };

  const isSuperAdmin = (): boolean => {
    return user?.role === ROLES.SUPER_ADMIN;
  };

  const isAdmin = (): boolean => {
    return user?.role === ROLES.ADMIN || isSuperAdmin();
  };

  const isManager = (): boolean => {
    return user?.role === ROLES.MANAGER || isAdmin();
  };

  return {
    hasRole,
    hasAnyRole,
    isSuperAdmin,
    isAdmin,
    isManager,
  };
}








