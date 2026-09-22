export const styles = {
  root: 'rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm dark:border-gray-700/80 dark:bg-gray-800/80 sm:p-6',

  header: 'flex items-start justify-between gap-4',

  titleWrapper: 'space-y-1',

  title: 'text-base font-semibold tracking-tight text-gray-950 dark:text-white',

  subtitle: 'text-xs text-gray-500 dark:text-gray-400',

  total: 'text-right',

  totalValue: 'text-xl font-bold tracking-tight text-gray-950 dark:text-white',

  totalLabel: 'text-xs text-gray-500 dark:text-gray-400',

  calendar: 'mt-7',

  weekdays:
    'grid grid-cols-7 gap-2 text-center text-[10px] font-semibold uppercase tracking-wide text-gray-400',

  grid: 'mt-2 grid grid-cols-7 gap-2',

  day: {
    root: 'flex aspect-square items-center justify-center rounded-lg text-[11px] font-medium transition-transform hover:scale-105',

    empty: 'bg-transparent',

    low: 'bg-gray-100 text-gray-500 dark:bg-gray-700/70 dark:text-gray-400',

    medium: 'bg-cyan-200 text-cyan-900 dark:bg-cyan-900/70 dark:text-cyan-200',

    high: 'bg-cyan-400 text-cyan-950 dark:bg-cyan-600 dark:text-white',

    veryHigh:
      'bg-cyan-600 text-white shadow-sm dark:bg-cyan-400 dark:text-cyan-950',
  },

  legend: 'mt-6 flex items-center justify-end gap-2 text-[10px] text-gray-400',

  legendItems: 'flex items-center gap-1',

  legendSquare: 'h-3 w-3 rounded-sm',
} as const
