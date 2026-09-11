export const styles = {
  root: {
    base: 'fixed left-0 top-16 z-40 flex h-[calc(100vh-4rem)] w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-200 dark:border-gray-700 dark:bg-gray-800',

    open: 'translate-x-0',

    closed: '-translate-x-full',
  },

  brand: {
    wrapper:
      'flex h-16 shrink-0 items-center border-b border-gray-200 px-6 dark:border-gray-700',

    name: 'text-xl font-bold text-gray-900 dark:text-white',
  },

  navigation: {
    wrapper: 'flex-1 overflow-y-auto px-3 py-4',

    section: {
      wrapper: 'mb-6',
    },

    item: {
      base: 'mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',

      active: 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white',

      inactive:
        'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',

      icon: 'h-5 w-5 shrink-0',
    },
  },
} as const
