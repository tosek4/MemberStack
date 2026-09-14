export const styles = {
  card: {
    base: 'rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800',
  },

  header: {
    base: 'flex items-start justify-between gap-4',
  },

  member: {
    wrapper: 'flex items-center gap-3',
    avatar:
      'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700 dark:bg-primary-900/40 dark:text-primary-300',
    info: 'min-w-0',
    name: 'truncate text-sm font-semibold text-gray-900 dark:text-white',
    email: 'truncate text-xs text-gray-500 dark:text-gray-400',
  },

  amount: {
    wrapper: 'text-right',
    value: 'text-lg font-bold text-gray-900 dark:text-white',
    currency: 'ml-1 text-xs font-medium text-gray-500 dark:text-gray-400',
  },

  divider: 'my-4 border-t border-gray-100 dark:border-gray-700',

  details: {
    grid: 'grid grid-cols-2 gap-4',
    item: 'min-w-0',
    label: 'mb-1 text-xs font-medium text-gray-500 dark:text-gray-400',
    value: 'truncate text-sm font-medium text-gray-900 dark:text-white',
  },

  footer: {
    base: 'mt-4 flex items-center justify-between',
    date: 'text-xs text-gray-500 dark:text-gray-400',
    action:
      'text-sm font-medium text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300',
  },

  badge: {
    base: 'inline-flex rounded-full px-2.5 py-1 text-xs font-medium',
    paid: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    pending:
      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    failed: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    refunded: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  },

  method: {
    base: 'text-sm text-gray-700 dark:text-gray-300',
  },
} as const
