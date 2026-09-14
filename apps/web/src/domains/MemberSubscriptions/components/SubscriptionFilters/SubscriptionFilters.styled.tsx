export const styles = {
  root: 'mb-6 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800',

  search: {
    wrapper: 'relative',

    icon: 'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400',

    input:
      'w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary-400 dark:focus:ring-primary-900',
  },

  status: {
    wrapper: 'mt-4 flex flex-wrap gap-2',

    button: 'rounded-lg px-3 py-2 text-sm font-medium transition-colors',

    active: 'bg-primary-600 text-white',

    inactive:
      'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600',
  },
} as const
