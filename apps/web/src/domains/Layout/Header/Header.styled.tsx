export const styles = {
  root: 'flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-800',

  left: {
    wrapper: 'flex items-center',
  },

  menuButton:
    'rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-600',

  right: {
    wrapper: 'flex items-center gap-2',

    themeButton:
      'rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-600',

    user: {
      wrapper: 'relative',

      button:
        'flex items-center gap-3 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700',

      avatar:
        'flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-700 dark:bg-gray-600 dark:text-gray-200',

      info: 'hidden text-left sm:block',

      name: 'text-sm font-medium text-gray-900 dark:text-white',

      role: 'text-xs text-gray-500 dark:text-gray-400',
    },

    dropdown: {
      root: 'absolute right-0 top-12 z-50 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-700 dark:bg-gray-800',

      item: 'flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700',

      divider: 'my-1 border-t border-gray-200 dark:border-gray-700',

      logout:
        'flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700',
    },
  },
} as const
