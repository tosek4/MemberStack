export const styles = {
  card: {
    root: 'rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800',

    header: 'flex items-start justify-between',

    user: {
      wrapper: 'flex items-center gap-3',

      avatar:
        'flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700 dark:bg-primary-900 dark:text-primary-300',

      info: {
        wrapper: 'min-w-0',

        name: 'truncate font-semibold text-gray-900 dark:text-white',

        email: 'truncate text-sm text-gray-500 dark:text-gray-400',
      },
    },

    status: {
      base: 'rounded-full px-2.5 py-1 text-xs font-medium',

      active:
        'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',

      inactive: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
    },
  },

  details: {
    wrapper:
      'mt-5 grid grid-cols-1 gap-3 border-t border-gray-100 pt-4 dark:border-gray-700 sm:grid-cols-2',

    item: {
      label: 'text-xs text-gray-500 dark:text-gray-400',

      value: 'mt-1 text-sm font-medium text-gray-900 dark:text-gray-200',
    },
  },

  role: {
    base: 'mt-4 inline-flex rounded-md px-2.5 py-1 text-xs font-medium',

    superAdmin:
      'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',

    admin: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',

    receptionist:
      'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',

    trainer:
      'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  },

  actions: {
    wrapper:
      'mt-5 flex gap-2 border-t border-gray-100 pt-4 dark:border-gray-700',

    button: 'rounded-md px-3 py-2 text-sm font-medium transition-colors',

    edit: 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700',

    toggle:
      'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20',
  },
} as const
