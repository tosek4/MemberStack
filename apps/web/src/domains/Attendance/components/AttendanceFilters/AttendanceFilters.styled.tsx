export const styles = {
  container:
    'flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800',
  search: {
    wrapper: 'relative flex w-full ',

    icon: 'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400',

    input:
      'h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm text-gray-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white',
  },

  filters: 'flex w-full flex-col gap-3 sm:flex-row md:w-auto',

  select:
    'h-10 w-full min-w-[150px] rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200',

  date: 'h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200',

  dateButton:
    'h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600',
} as const
