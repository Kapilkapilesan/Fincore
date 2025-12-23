'use client'

import React from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Building2,
  Users,
  UsersRound,
  User,
  FileText,
  DollarSign,
  ClipboardList,
  BarChart3,
  Wallet,
  TrendingUp,
  Settings,
  ChevronDown,
  Globe,
  Shield,
  AlertCircle,
  ArrowLeftRight,
  Receipt,
  ChevronLeft,
  ChevronRight,
  Download,
  Calendar
} from 'lucide-react';
import type { Page } from './MainLayout';

interface SidebarProps {
  currentPage: Page;
  isOpen: boolean;
  userRole: string;
  onSidebarToggle?: () => void;
}

// Map Page type to route paths
const getRouteFromPage = (page: Page): string => {
  const routeMap: Record<Page, string> = {
    'dashboard': '/dashboard',
    'branches': '/branches',
    'centers': '/centers',
    'view-scheduling': '/centers/view-scheduling',
    'view-meeting-scheduling': '/centers/view-meeting-scheduling',
    'groups': '/groups',
    'customers': '/customers',
    'loan-create': '/loans/create',
    'loan-approval': '/loans/approval',
    'loan-list': '/loans/list',
    'due-list': '/collections/due-list',
    'collections': '/collections/collections',
    'collection-summary': '/collections/collection-summary',
    'reports': '/reports',
    'finance': '/finance/overview',
    'fund-transactions': '/finance/fund-transactions',
    'branch-transactions': '/finance/branch-transactions',
    'investments': '/investment',
    'staff-management': '/staff',
    'roles-privileges': '/roles',
    'complaints': '/complaints',
    'system-config': '/system-config',
    'public-website': '/public-website/home',
    'documents': '/documents',
  };
  return routeMap[page] || '/dashboard';
};

interface MenuItem {
  id: Page;
  label: string;
  icon: React.ReactNode;
  submenu?: MenuItem[];
  roles?: string[];
}

export function Sidebar({ currentPage, isOpen, userRole, onSidebarToggle }: SidebarProps) {
  const [expandedMenus, setExpandedMenus] = React.useState<string[]>(['loans', 'centers', 'collections', 'finance']);
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      id: 'branches',
      label: 'Branches',
      icon: <Building2 className="w-5 h-5" />,
      roles: ['Super Admin', 'Admin']
    },
    {
      id: 'groups',
      label: 'Groups',
      icon: <UsersRound className="w-5 h-5" />
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: <User className="w-5 h-5" />
    }
  ];

  const loanMenuItems: MenuItem[] = [
    { id: 'loan-create', label: 'Create Loan', icon: <FileText className="w-4 h-4" /> },
    { id: 'loan-approval', label: 'Loan Approval', icon: <Shield className="w-4 h-4" />, roles: ['Manager', 'Admin', 'Super Admin'] },
    { id: 'loan-list', label: 'Loan List', icon: <ClipboardList className="w-4 h-4" /> }
  ];

  const centerMenuItems: MenuItem[] = [
    { id: 'view-scheduling', label: 'View Scheduling', icon: <Calendar className="w-4 h-4" /> },
    { id: 'view-meeting-scheduling', label: 'View Meeting Scheduling', icon: <Users className="w-4 h-4" /> }
  ];

  const collectionMenuItems: MenuItem[] = [
    { id: 'due-list', label: 'Due List', icon: <ClipboardList className="w-4 h-4" /> },
    { id: 'collections', label: 'Collections', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'collection-summary', label: 'Collection Summary', icon: <Receipt className="w-4 h-4" /> }
  ];

  const financeMenuItems: MenuItem[] = [
    { id: 'finance', label: 'Finance Overview', icon: <Wallet className="w-4 h-4" /> },
    { id: 'fund-transactions', label: 'Fund Transactions', icon: <ArrowLeftRight className="w-4 h-4" />, roles: ['Super Admin', 'Admin'] },
    { id: 'branch-transactions', label: 'Branch Transactions', icon: <Building2 className="w-4 h-4" /> }
  ];

  const toggleMenu = (menuId: string) => {
    if (!isCollapsed) {
      setExpandedMenus(prev =>
        prev.includes(menuId)
          ? prev.filter(id => id !== menuId)
          : [...prev, menuId]
      );
    }
  };

  const renderMenuItem = (item: MenuItem) => {
    // Role-based filtering
    if (item.roles && !item.roles.includes(userRole)) {
      return null;
    }

    const isActive = currentPage === item.id;
    const href = getRouteFromPage(item.id);

    return (
      <Link
        key={item.id}
        href={href}
        onClick={() => {
          if (onSidebarToggle) {
            onSidebarToggle();
          }
        }}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative ${
          isActive
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        title={isCollapsed ? item.label : ''}
      >
        <div className={`${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'}`}>
          {item.icon}
        </div>
        {!isCollapsed && (
          <span className="text-sm font-medium truncate">{item.label}</span>
        )}
        {isCollapsed && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
            {item.label}
          </div>
        )}
      </Link>
    );
  };

  return (
    <aside className={`
      fixed lg:static inset-y-0 left-0 z-50
      ${isCollapsed ? 'w-20' : 'w-64'} bg-white dark:bg-gray-800 flex flex-col border-r border-gray-200 dark:border-gray-700
      transform transition-all duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0
    `}>
      {/* Logo */}
      <div className={`p-4 border-b border-gray-200 dark:border-gray-700 ${isCollapsed ? 'px-3' : 'px-4'}`}>
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 tracking-tight">LMS</h2>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Microfinance</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {/* Main Section */}
        {!isCollapsed && (
          <div className="px-3 mb-2">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Main</p>
          </div>
        )}
        
        {/* Main Menu Items */}
        {menuItems.map(renderMenuItem)}

        {/* Centers Section */}
        <div className="pt-3">
          {!isCollapsed && (
            <div className="px-3 mb-2">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Centers</p>
            </div>
          )}
          
          {isCollapsed ? (
            // Collapsed view - show icon only
            <button
              onClick={() => toggleMenu('centers')}
              className={`w-full flex items-center justify-center px-3 py-2.5 rounded-lg transition-all group relative ${
                currentPage === 'view-scheduling' || currentPage === 'view-meeting-scheduling'
                  ? 'bg-blue-600'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              title="Centers"
            >
              <Users className={`w-5 h-5 ${
                currentPage === 'view-scheduling' || currentPage === 'view-meeting-scheduling'
                  ? 'text-white'
                  : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
              }`} />
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                Centers
              </div>
            </button>
          ) : (
            <>
              <button
                onClick={() => toggleMenu('centers')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all group ${
                  currentPage === 'view-scheduling' || currentPage === 'view-meeting-scheduling'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users className={`w-5 h-5 ${
                    currentPage === 'view-scheduling' || currentPage === 'view-meeting-scheduling'
                      ? 'text-white'
                      : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                  }`} />
                  <span className="text-sm font-medium">Centers (CSU)</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    expandedMenus.includes('centers') ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedMenus.includes('centers') && (
                <div className="ml-8 mt-1 space-y-0.5 border-l-2 border-gray-200 dark:border-gray-700 pl-2">
                  {centerMenuItems.map(item => {
                    if (item.roles && !item.roles.includes(userRole)) return null;
                    const isActive = currentPage === item.id;
                    const href = getRouteFromPage(item.id);
                    return (
                      <Link
                        key={item.id}
                        href={href}
                        onClick={() => {
                          if (onSidebarToggle) {
                            onSidebarToggle();
                          }
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-md transition-all text-sm ${
                          isActive
                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Loans Section */}
        <div className="pt-3">
          {!isCollapsed && (
            <div className="px-3 mb-2">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Loans</p>
            </div>
          )}
          
          {isCollapsed ? (
            // Collapsed view - show icon only
            <button
              onClick={() => toggleMenu('loans')}
              className="w-full flex items-center justify-center px-3 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all group relative"
              title="Loans"
            >
              <FileText className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                Loans
              </div>
            </button>
          ) : (
            <>
              <button
                onClick={() => toggleMenu('loans')}
                className="w-full flex items-center justify-between px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all group"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
                  <span className="text-sm font-medium">Loans</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    expandedMenus.includes('loans') ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedMenus.includes('loans') && (
                <div className="ml-8 mt-1 space-y-0.5 border-l-2 border-gray-200 dark:border-gray-700 pl-2">
                  {loanMenuItems.map(item => {
                    if (item.roles && !item.roles.includes(userRole)) return null;
                    const isActive = currentPage === item.id;
                    const href = getRouteFromPage(item.id);
                    return (
                      <Link
                        key={item.id}
                        href={href}
                        onClick={() => {
                          if (onSidebarToggle) {
                            onSidebarToggle();
                          }
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-md transition-all text-sm ${
                          isActive
                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Collections Section */}
        <div className="pt-3">
          {!isCollapsed && (
            <div className="px-3 mb-2">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Collections</p>
            </div>
          )}
          
          {isCollapsed ? (
            <button
              onClick={() => toggleMenu('collections')}
              className="w-full flex items-center justify-center px-3 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all group relative"
              title="Collections"
            >
              <DollarSign className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                Collections
              </div>
            </button>
          ) : (
            <>
              <button
                onClick={() => toggleMenu('collections')}
                className="w-full flex items-center justify-between px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all group"
              >
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
                  <span className="text-sm font-medium">Collections</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    expandedMenus.includes('collections') ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedMenus.includes('collections') && (
                <div className="ml-8 mt-1 space-y-0.5 border-l-2 border-gray-200 dark:border-gray-700 pl-2">
                  {collectionMenuItems.map(item => {
                    const isActive = currentPage === item.id;
                    const href = getRouteFromPage(item.id);
                    return (
                      <Link
                        key={item.id}
                        href={href}
                        onClick={() => {
                          if (onSidebarToggle) {
                            onSidebarToggle();
                          }
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-md transition-all text-sm ${
                          isActive
                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Reports */}
        {!isCollapsed && (
          <div className="px-3 mb-2 pt-3">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Analytics</p>
          </div>
        )}
        
        <Link
          href={getRouteFromPage('reports')}
          onClick={() => {
            if (onSidebarToggle) {
              onSidebarToggle();
            }
          }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative ${
            currentPage === 'reports'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          title={isCollapsed ? 'Reports' : ''}
        >
          <div className={`${currentPage === 'reports' ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`}>
            <BarChart3 className="w-5 h-5" />
          </div>
          {!isCollapsed && <span className="text-sm font-medium">Reports</span>}
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              Reports
            </div>
          )}
        </Link>

        {/* Finance Section */}
        <div className="pt-3">
          {!isCollapsed && (
            <div className="px-3 mb-2">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Finance</p>
            </div>
          )}
          
          {isCollapsed ? (
            <button
              onClick={() => toggleMenu('finance')}
              className="w-full flex items-center justify-center px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-all group relative"
              title="Finance"
            >
              <Wallet className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                Finance
              </div>
            </button>
          ) : (
            <>
              <button
                onClick={() => toggleMenu('finance')}
                className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Wallet className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
                  <span className="text-sm font-medium">Finance</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    expandedMenus.includes('finance') ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedMenus.includes('finance') && (
                <div className="ml-8 mt-1 space-y-0.5 border-l-2 border-gray-200 pl-2">
                  {financeMenuItems.map(item => {
                    if (item.roles && !item.roles.includes(userRole)) return null;
                    const isActive = currentPage === item.id;
                    const href = getRouteFromPage(item.id);
                    return (
                      <Link
                        key={item.id}
                        href={href}
                        onClick={() => {
                          if (onSidebarToggle) {
                            onSidebarToggle();
                          }
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-md transition-all text-sm ${
                          isActive
                            ? 'bg-blue-50 text-blue-600 font-medium'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Investment Management */}
        {['Super Admin', 'Admin'].includes(userRole) && (
          <>
            {!isCollapsed && (
              <div className="px-3 mb-2 pt-3">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Management</p>
              </div>
            )}
            
            <Link
              href={getRouteFromPage('investments')}
              onClick={() => {
                if (onSidebarToggle) {
                  onSidebarToggle();
                }
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative ${
                currentPage === 'investments'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              title={isCollapsed ? 'Investment Management' : ''}
            >
              <div className={`${currentPage === 'investments' ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`}>
                <TrendingUp className="w-5 h-5" />
              </div>
              {!isCollapsed && <span className="text-sm font-medium">Investment</span>}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  Investment Management
                </div>
              )}
            </Link>
          </>
        )}

        {/* Staff Management */}
        {['Super Admin', 'Admin'].includes(userRole) && (
          <Link
            href={getRouteFromPage('staff-management')}
            onClick={() => {
              if (onSidebarToggle) {
                onSidebarToggle();
              }
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative ${
              currentPage === 'staff-management'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            title={isCollapsed ? 'Staff Management' : ''}
          >
            <div className={`${currentPage === 'staff-management' ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`}>
              <Users className="w-5 h-5" />
            </div>
            {!isCollapsed && <span className="text-sm font-medium">Staff</span>}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                Staff Management
              </div>
            )}
          </Link>
        )}

        {/* Roles & Privileges */}
        {['Super Admin', 'Admin'].includes(userRole) && (
          <Link
            href={getRouteFromPage('roles-privileges')}
            onClick={() => {
              if (onSidebarToggle) {
                onSidebarToggle();
              }
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative ${
              currentPage === 'roles-privileges'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            title={isCollapsed ? 'Roles & Privileges' : ''}
          >
            <div className={`${currentPage === 'roles-privileges' ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`}>
              <Shield className="w-5 h-5" />
            </div>
            {!isCollapsed && <span className="text-sm font-medium">Roles</span>}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                Roles & Privileges
              </div>
            )}
          </Link>
        )}

        {/* Complaints */}
        {['Super Admin', 'Admin'].includes(userRole) && (
          <Link
            href={getRouteFromPage('complaints')}
            onClick={() => {
              if (onSidebarToggle) {
                onSidebarToggle();
              }
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative ${
              currentPage === 'complaints'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            title={isCollapsed ? 'Complaints' : ''}
          >
            <div className={`${currentPage === 'complaints' ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`}>
              <AlertCircle className="w-5 h-5" />
            </div>
            {!isCollapsed && <span className="text-sm font-medium">Complaints</span>}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                Complaints
              </div>
            )}
          </Link>
        )}

        {/* System Config */}
        {['Super Admin', 'Admin'].includes(userRole) && (
          <>
            {!isCollapsed && (
              <div className="px-3 mb-2 pt-3">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Settings</p>
              </div>
            )}
            
            <Link
              href={getRouteFromPage('system-config')}
              onClick={() => {
                if (onSidebarToggle) {
                  onSidebarToggle();
                }
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative ${
                currentPage === 'system-config'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              title={isCollapsed ? 'System Config' : ''}
            >
              <div className={`${currentPage === 'system-config' ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`}>
                <Settings className="w-5 h-5" />
              </div>
              {!isCollapsed && <span className="text-sm font-medium">System Config</span>}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  System Config
                </div>
              )}
            </Link>
          </>
        )}

        {/* Public Website */}
        <div className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-700">
          {/* Documents */}
          <Link
            href={getRouteFromPage('documents')}
            onClick={() => {
              if (onSidebarToggle) {
                onSidebarToggle();
              }
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative mb-1 ${
              currentPage === 'documents'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title={isCollapsed ? 'Documents & Downloads' : ''}
          >
            <div className={`${currentPage === 'documents' ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'}`}>
              <Download className="w-5 h-5" />
            </div>
            {!isCollapsed && <span className="text-sm font-medium">Documents</span>}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                Documents & Downloads
              </div>
            )}
          </Link>

          {/* Public Website */}
          <Link
            href={getRouteFromPage('public-website')}
            onClick={() => {
              if (onSidebarToggle) {
                onSidebarToggle();
              }
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative ${
              currentPage === 'public-website'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title={isCollapsed ? 'Public Website' : ''}
          >
            <div className={`${currentPage === 'public-website' ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'}`}>
              <Globe className="w-5 h-5" />
            </div>
            {!isCollapsed && <span className="text-sm font-medium">Public Website</span>}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                Public Website
              </div>
            )}
          </Link>
        </div>
      </nav>

      {/* Collapse Toggle Button */}
      <div className="hidden lg:block border-t border-gray-200 dark:border-gray-700 p-3">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all group"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}

