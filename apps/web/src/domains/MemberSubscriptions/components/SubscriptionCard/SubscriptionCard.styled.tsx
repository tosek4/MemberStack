export const styles = {
  root: 'rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800',

  header: {
    wrapper: 'flex items-start justify-between gap-4',
  },

  member: {
    wrapper: 'flex min-w-0 items-center gap-3',

    avatar:
      'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700 dark:bg-primary-900/40 dark:text-primary-300',

    info: 'min-w-0',

    name: 'truncate text-sm font-semibold text-gray-900 dark:text-white',

    email: 'mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400',
  },

  status: {
    base: 'shrink-0 rounded-full px-2.5 py-1 text-xs font-medium',

    active:
      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',

    expiring:
      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',

    expired: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  },

  plan: {
    wrapper:
      'mt-5 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-700',

    label: 'text-xs text-gray-500 dark:text-gray-400',

    name: 'mt-1 text-base font-semibold text-gray-900 dark:text-white',

    price: 'text-xl font-bold text-gray-900 dark:text-white',
  },

  dates: {
    wrapper: 'mt-4 grid grid-cols-2 gap-3',

    item: 'flex items-start gap-2 rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50',

    label: 'text-xs text-gray-500 dark:text-gray-400',

    value: 'mt-1 text-sm font-medium text-gray-900 dark:text-white',
  },

  actions: {
    wrapper:
      'mt-5 flex items-center gap-2 border-t border-gray-100 pt-4 dark:border-gray-700',

    view: 'flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700',

    renew:
      'flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700',
  },
} as const
