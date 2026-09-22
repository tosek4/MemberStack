export const styles = {
  root: 'rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm dark:border-gray-700/80 dark:bg-gray-800/80 sm:p-6',

  header: 'flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between',

  titleWrapper: 'space-y-1',

  title: 'text-base font-semibold tracking-tight text-gray-950 dark:text-white',

  subtitle: 'text-xs text-gray-500 dark:text-gray-400',

  periods:
    'flex items-center rounded-lg border border-gray-200 bg-gray-50 p-1 dark:border-gray-700 dark:bg-gray-900/60',

  period:
    'rounded-md px-3 py-1.5 text-xs font-medium text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white',

  periodActive:
    'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white',

  chart: 'mt-6 h-[320px] w-full',
} as const
