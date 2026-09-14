export const styles = {
  container:
    'flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:flex-row md:items-center md:justify-between',

  search: {
    wrapper: 'relative flex w-full items-center md:max-w-md',

    icon: 'pointer-events-none absolute left-3 text-gray-400 dark:text-gray-500',

    input:
      'h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-10 text-sm text-gray-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400',

    clear:
      'absolute right-3 flex items-center justify-center text-gray-400 transition hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200',
  },

  filters: 'flex w-full flex-col gap-3 sm:flex-row md:w-auto',

  select: {
    wrapper: 'relative flex w-full items-center sm:w-auto',

    icon: 'pointer-events-none absolute left-3 text-gray-400 dark:text-gray-400',

    input:
      'h-10 w-full min-w-[160px] appearance-none rounded-lg border border-gray-200 bg-white pl-9 pr-8 text-sm text-gray-700 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200',
  },
} as const
