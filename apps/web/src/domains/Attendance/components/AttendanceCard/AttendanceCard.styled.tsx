export const styles = {
  card: 'rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800',

  header: 'flex items-start justify-between gap-4',

  member: {
    wrapper: 'flex items-center gap-3',

    avatar:
      'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700 dark:bg-primary-900/40 dark:text-primary-300',

    info: 'min-w-0',

    name: 'truncate text-sm font-semibold text-gray-900 dark:text-white',

    email: 'truncate text-xs text-gray-500 dark:text-gray-400',
  },

  badge: {
    base: 'inline-flex rounded-full px-2.5 py-1 text-xs font-medium',

    checkedIn:
      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',

    checkedOut: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  },

  divider: 'my-4 border-t border-gray-100 dark:border-gray-700',

  details: 'grid grid-cols-2 gap-4',

  detail: {
    label: 'mb-1 text-xs font-medium text-gray-500 dark:text-gray-400',

    value: 'text-sm font-medium text-gray-900 dark:text-white',
  },

  footer: 'mt-4 flex items-center justify-between',

  action:
    'rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700',
} as const
