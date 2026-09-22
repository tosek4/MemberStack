export const styles = {
  grid: 'grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6',

  card: {
    root: 'rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800',

    header: 'flex items-center justify-between',

    title: 'text-sm font-medium text-gray-500 dark:text-gray-400',

    value: 'mt-2 text-3xl font-bold text-gray-900 dark:text-white',

    description: 'mt-2 text-sm text-gray-500 dark:text-gray-400',

    trend: 'font-medium',

    trendPositive: 'text-green-600 dark:text-green-500',

    trendNegative: 'text-red-600 dark:text-red-500',
  },
} as const
