export const styles = {
  card: {
    root: 'rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800',

    title: 'text-lg font-semibold text-gray-900 dark:text-white',

    calendar: 'mt-6',

    weekdays:
      'grid grid-cols-7 gap-2 text-center text-xs font-medium text-gray-500 dark:text-gray-400',

    grid: 'mt-2 grid grid-cols-7 gap-2',

    day: {
      root: 'flex aspect-square items-center justify-center rounded-md text-xs font-medium text-gray-900 dark:text-white',

      empty: 'bg-transparent',

      low: 'bg-gray-100 dark:bg-gray-700',

      medium: 'bg-gray-300 dark:bg-gray-600',

      high: 'bg-gray-500 text-white dark:bg-gray-500',

      veryHigh: 'bg-gray-800 text-white dark:bg-gray-300 dark:text-gray-900',
    },

    legend:
      'mt-6 flex items-center justify-end gap-2 text-xs text-gray-500 dark:text-gray-400',

    legendItems: 'flex items-center gap-1',

    legendSquare: 'h-3 w-3 rounded-sm',
  },
} as const
