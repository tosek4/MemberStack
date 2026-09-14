export const styles = {
  container:
    'rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800',

  header: {
    title: 'text-lg font-semibold text-gray-900 dark:text-white',
    description: 'mt-1 text-sm text-gray-500 dark:text-gray-400',
  },

  form: 'mt-6 grid grid-cols-1 gap-5 md:grid-cols-2',

  field: {
    wrapper: 'flex flex-col gap-1.5',
    full: 'md:col-span-2',

    label: 'text-sm font-medium text-gray-700 dark:text-gray-300',

    input:
      'h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white',

    select:
      'h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white',

    error: 'text-xs text-red-500 dark:text-red-400',
  },

  actions:
    'mt-6 flex items-center justify-end gap-3 border-t border-gray-100 pt-5 dark:border-gray-700',

  cancel:
    'rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700',

  submit:
    'rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50',
} as const
