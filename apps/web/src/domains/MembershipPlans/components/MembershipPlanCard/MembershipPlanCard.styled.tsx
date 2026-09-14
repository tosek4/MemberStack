export const styles = {
  root: 'rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800',

  header: {
    wrapper: 'flex items-start justify-between',
    titleRow: 'flex items-center gap-2',
    title: 'text-lg font-semibold text-gray-900 dark:text-white',
  },

  status: {
    base: 'rounded-full px-2.5 py-1 text-xs font-medium',
    active:
      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    inactive: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
  },

  description: 'mt-2 text-sm text-gray-500 dark:text-gray-400',

  price: {
    wrapper: 'mt-5 flex items-baseline',
    amount: 'text-3xl font-bold text-gray-900 dark:text-white',
    period: 'ml-1 text-sm text-gray-500 dark:text-gray-400',
  },

  details: {
    wrapper:
      'mt-5 space-y-3 border-t border-gray-100 pt-4 dark:border-gray-700',
    item: 'flex items-center justify-between',
    label: 'text-sm text-gray-500 dark:text-gray-400',
    value: 'text-sm font-medium text-gray-900 dark:text-white',
  },

  actions: {
    wrapper:
      'mt-5 flex items-center gap-2 border-t border-gray-100 pt-4 dark:border-gray-700',

    edit: 'flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700',

    delete:
      'flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/20',
  },
} as const
