'use client'

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

interface User {
  id: string;
  name: string;
  role: string;
  branch?: string;
}

interface MainLayoutProps {
  user: User;
  onLogout: () => void;
  currentPath?: string;
  children: React.ReactNode;
}

export type Page = 
  | 'dashboard'
  | 'branches'
  | 'centers'
  | 'groups'
  | 'customers'
  | 'loan-create'
  | 'loan-approval'
  | 'loan-list'
  | 'due-list'
  | 'collections'
  | 'collection-summary'
  | 'reports'
  | 'finance'
  | 'fund-transactions'
  | 'branch-transactions'
  | 'investments'
  | 'staff-management'
  | 'roles-privileges'
  | 'complaints'
  | 'system-config'
  | 'public-website'
  | 'documents';

// Export Page type for use in Sidebar
export { type Page };

export function MainLayout({ user, onLogout, currentPath = '', children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Default closed on mobile

  // Map pathname to page for sidebar highlighting
  const getPageFromPath = (path: string): Page => {
    if (path === '/dashboard') return 'dashboard'
    if (path.startsWith('/branches')) return 'branches'
    if (path.startsWith('/centers')) return 'centers'
    if (path.startsWith('/groups')) return 'groups'
    if (path.startsWith('/customers')) return 'customers'
    if (path.startsWith('/loans/create')) return 'loan-create'
    if (path.startsWith('/loans/approval')) return 'loan-approval'
    if (path.startsWith('/loans')) return 'loan-list'
    if (path.startsWith('/collections/due-list')) return 'due-list'
    if (path.startsWith('/collections/collection-summary')) return 'collection-summary'
    if (path.startsWith('/collections')) return 'collections'
    if (path.startsWith('/reports')) return 'reports'
    if (path.startsWith('/finance/fund-transactions')) return 'fund-transactions'
    if (path.startsWith('/finance/branch-transactions')) return 'branch-transactions'
    if (path.startsWith('/finance')) return 'finance'
    if (path.startsWith('/investment')) return 'investments'
    if (path.startsWith('/staff')) return 'staff-management'
    if (path.startsWith('/roles')) return 'roles-privileges'
    if (path.startsWith('/complaints')) return 'complaints'
    if (path.startsWith('/system-config')) return 'system-config'
    if (path.startsWith('/documents')) return 'documents'
    if (path.startsWith('/public-website')) return 'public-website'
    return 'dashboard'
  }

  const currentPage = getPageFromPath(currentPath);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        isOpen={sidebarOpen}
        userRole={user.role}
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Header */}
        <Topbar
          user={user}
          onLogout={onLogout}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}








