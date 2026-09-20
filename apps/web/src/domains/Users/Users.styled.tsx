export const styles = {
  root: 'min-h-screen bg-gray-50 p-6 dark:bg-gray-900',

  header: {
    wrapper:
      'mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between',

    title: 'text-2xl font-bold text-gray-900 dark:text-white',

    subtitle: 'mt-1 text-sm text-gray-500 dark:text-gray-400',

    button:
      'rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300',
  },

  stats: {
    grid: 'mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4',

    card: 'rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800',

    label: 'text-sm text-gray-500 dark:text-gray-400',

    value: 'mt-2 text-2xl font-bold text-gray-900 dark:text-white',
  },

  grid: 'grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3',

  empty:
    'rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-gray-600 dark:bg-gray-800',

  emptyTitle: 'text-sm font-semibold text-gray-900 dark:text-white',

  emptyDescription: 'mt-1 text-sm text-gray-500 dark:text-gray-400',
} as const
