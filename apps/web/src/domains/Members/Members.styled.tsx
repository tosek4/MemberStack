export const styles = {
  root: 'min-h-screen bg-gray-50 dark:bg-gray-900',

  container: 'mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8',

  header: {
    wrapper:
      'mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between',

    title: 'text-2xl font-bold tracking-tight text-gray-900 dark:text-white',

    subtitle: 'mt-1 text-sm text-gray-500 dark:text-gray-400',

    addButton:
      'rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800',
  },

  grid: 'grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3',

  empty:
    'rounded-lg border border-gray-200 bg-white px-6 py-12 text-center dark:border-gray-700 dark:bg-gray-800',

  emptyTitle: 'text-base font-semibold text-gray-900 dark:text-white',

  emptyText: 'mt-1 text-sm text-gray-500 dark:text-gray-400',
} as const
