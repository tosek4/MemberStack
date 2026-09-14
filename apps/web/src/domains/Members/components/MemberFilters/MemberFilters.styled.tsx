export const styles = {
  root: 'mb-6 flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 lg:flex-row lg:items-center lg:justify-between',

  search: {
    wrapper: 'relative w-full lg:max-w-md',

    icon: 'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400',

    input:
      'block w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400',
  },

  status: {
    wrapper: 'flex flex-wrap gap-2',

    button: 'rounded-lg px-3 py-2 text-sm font-medium transition-colors',

    active: 'bg-primary-600 text-white',

    inactive:
      'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600',
  },
} as const
