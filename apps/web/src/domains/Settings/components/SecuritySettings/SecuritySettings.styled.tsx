export const styles = {
  root: 'space-y-6',

  field: 'max-w-md space-y-1.5',

  label: 'block text-sm font-medium text-gray-900 dark:text-white',

  help: 'text-xs text-gray-500 dark:text-gray-400',

  select:
    'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white',

  password: {
    wrapper:
      'flex items-center justify-between border-t border-gray-200 pt-5 dark:border-gray-700',

    title: 'text-sm font-medium text-gray-900 dark:text-white',

    description: 'mt-1 text-xs text-gray-500 dark:text-gray-400',

    button:
      'rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700',
  },
} as const
