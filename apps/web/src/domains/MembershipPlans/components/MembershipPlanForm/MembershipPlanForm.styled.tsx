export const styles = {
  form: 'space-y-5',

  field: 'space-y-1.5',

  label: 'block text-sm font-medium text-gray-900 dark:text-white',

  input:
    'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white',

  textarea:
    'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white',

  row: 'grid grid-cols-1 gap-5 md:grid-cols-2',

  error: 'text-sm text-red-600 dark:text-red-400',

  actions: 'flex justify-end gap-3 pt-2',

  cancelButton:
    'rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700',

  submitButton:
    'rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 disabled:cursor-not-allowed disabled:opacity-50',
} as const
