export const styles = {
  root: 'min-h-screen bg-gray-50 dark:bg-gray-900',

  container: 'mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8',

  header: 'mb-6',

  title: 'text-2xl font-bold tracking-tight text-gray-900 dark:text-white',

  subtitle: 'mt-1 text-sm text-gray-500 dark:text-gray-400',

  form: 'space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800',

  row: 'grid grid-cols-1 gap-6 sm:grid-cols-2',

  field: 'space-y-2',

  label: 'block text-sm font-medium text-gray-700 dark:text-gray-300',

  input:
    'block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary-400 dark:focus:ring-primary-900',

  textarea:
    'block w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary-400 dark:focus:ring-primary-900',

  error: 'text-sm text-red-600 dark:text-red-400',

  actions:
    'flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end dark:border-gray-700',

  cancelButton:
    'rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700',

  submitButton:
    'rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50',
} as const
