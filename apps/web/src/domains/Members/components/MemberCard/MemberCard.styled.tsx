export const styles = {
  root: {
    base:
      'rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800',
  },

  header: {
    wrapper: 'flex items-start justify-between gap-4',
  },

  member: {
    wrapper: 'flex min-w-0 items-center gap-3',

    avatar:
      'flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-100 text-sm font-semibold text-primary-700 dark:bg-primary-900 dark:text-primary-200',

    avatarImage: 'h-full w-full object-cover',

    initials: 'text-sm font-semibold',

    info: {
      wrapper: 'min-w-0',

      name: 'truncate text-sm font-semibold text-gray-900 dark:text-white',

      email: 'truncate text-sm text-gray-500 dark:text-gray-400',
    },
  },

  status: {
    base:
      'shrink-0 rounded-full px-2.5 py-1 text-xs font-medium',

    active:
      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',

    expiring:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',

    expired:
      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',

    noSubscription:
      'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  },

  details: {
    wrapper:
      'mt-5 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 dark:border-gray-700',

    item: {
      wrapper: 'min-w-0',

      label: 'text-xs text-gray-500 dark:text-gray-400',

      value:
        'mt-1 truncate text-sm font-medium text-gray-900 dark:text-white',
    },
  },

  footer: {
    wrapper:
      'mt-5 flex items-center justify-end border-t border-gray-100 pt-4 dark:border-gray-700',

    button:
      'text-sm font-medium text-primary-600 hover:underline dark:text-primary-400',
  },
} as const