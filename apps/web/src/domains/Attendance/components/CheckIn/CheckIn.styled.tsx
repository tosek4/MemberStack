export const styles = {
  container:
    'rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800',

  title: 'text-lg font-semibold text-gray-900 dark:text-white',

  description: 'mt-1 text-sm text-gray-500 dark:text-gray-400',

  form: 'mt-5 flex flex-col gap-4 sm:flex-row sm:items-end',

  field: 'flex flex-1 flex-col gap-1.5',

  label: 'text-sm font-medium text-gray-700 dark:text-gray-300',

  select:
    'h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:disabled:bg-gray-800',

  button:
    'inline-flex h-10 items-center justify-center rounded-lg bg-primary-600 px-5 text-sm font-medium text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50',

  error: 'text-xs text-red-500 dark:text-red-400',
} as const
