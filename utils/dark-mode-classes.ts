// Dark Mode Class Utilities - Common patterns for consistent dark mode styling

export const darkModeClasses = {
  // Cards and Containers
  card: 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700',
  cardHover: 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow',
  
  // Text Colors
  textPrimary: 'text-gray-900 dark:text-gray-100',
  textSecondary: 'text-gray-600 dark:text-gray-400',
  textTertiary: 'text-gray-500 dark:text-gray-500',
  textMuted: 'text-gray-400 dark:text-gray-600',
  
  // Headings
  heading: 'text-gray-900 dark:text-gray-100 font-semibold tracking-tight',
  
  // Backgrounds
  bgPrimary: 'bg-white dark:bg-gray-800',
  bgSecondary: 'bg-gray-50 dark:bg-gray-900',
  bgHover: 'hover:bg-gray-50 dark:hover:bg-gray-700',
  
  // Borders
  border: 'border-gray-200 dark:border-gray-700',
  borderLight: 'border-gray-100 dark:border-gray-700',
  
  // Inputs
  input: 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500',
  inputSecondary: 'bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100',
  
  // Buttons
  buttonPrimary: 'bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-600',
  buttonSecondary: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600',
  buttonDanger: 'bg-red-600 dark:bg-red-700 text-white hover:bg-red-700 dark:hover:bg-red-600',
  
  // Tables
  tableHeader: 'bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700',
  tableRow: 'border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50',
  tableCell: 'text-gray-900 dark:text-gray-100',
  
  // Modals
  modal: 'bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700',
  modalOverlay: 'bg-black/50 dark:bg-black/70',
  
  // Badges
  badgeGreen: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  badgeBlue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  badgeYellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
  badgeRed: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  badgeGray: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
  
  // Dropdowns & Selects
  select: 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500',
  dropdown: 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-xl rounded-2xl',
};
