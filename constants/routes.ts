export const ROUTES = {
  // Auth
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  
  // Dashboard
  DASHBOARD: '/dashboard',
  
  // Branches
  BRANCHES: '/branches',
  
  // Centers
  CENTERS: '/centers',
  
  // Groups
  GROUPS: '/groups',
  
  // Customers
  CUSTOMERS: '/customers',
  CUSTOMER_CREATE: '/customers/create',
  CUSTOMER_DETAIL: (id: string) => `/customers/${id}`,
  
  // Loans
  LOAN_CREATE: '/loans/create',
  LOAN_APPROVAL: '/loans/approval',
  LOAN_LIST: '/loans/list',
  
  // Collections
  DUE_LIST: '/collections/due-list',
  COLLECTIONS: '/collections/collections',
  COLLECTION_SUMMARY: '/collections/collection-summary',
  
  // Finance
  FINANCE_OVERVIEW: '/finance/overview',
  FUND_TRANSACTIONS: '/finance/fund-transactions',
  BRANCH_TRANSACTIONS: '/finance/branch-transactions',
  
  // Reports
  REPORTS: '/reports',
  
  // Investment
  INVESTMENT: '/investment',
  
  // Staff
  STAFF: '/staff',
  
  // Roles
  ROLES: '/roles',
  
  // Complaints
  COMPLAINTS: '/complaints',
  
  // System Config
  SYSTEM_CONFIG: '/system-config',
  
  // Documents
  DOCUMENTS: '/documents',
  
  // Public Website
  PUBLIC_WEBSITE_HOME: '/public-website/home',
  PUBLIC_WEBSITE_ABOUT: '/public-website/about',
  PUBLIC_WEBSITE_DOWNLOADS: '/public-website/downloads',
  PUBLIC_WEBSITE_CONTACT: '/public-website/contact',
} as const;










