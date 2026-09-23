export const styles = {
  container: 'mt-5 mx-auto w-full max-w-3xl',

  header: 'mb-6 space-y-4 flex items-center justify-between',

  backButton:
    'justify-center flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800',

  pageTitle: 'text-2xl font-semibold text-gray-900 dark:text-white',

  pageDescription: 'mt-1 text-sm text-gray-500 dark:text-gray-400',

  title: 'grid grid-cols-1 gap-5 md:grid-cols-2',

  form: 'w-full space-y-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 md:p-8 dark:border-gray-700 dark:bg-gray-800',

  field: 'space-y-1',

  label: 'block text-sm font-medium text-gray-900 dark:text-white',

  input:
    'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 transition focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400',

  select:
    'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 transition focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white',

  button:
    'w-full rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 disabled:cursor-not-allowed disabled:opacity-50',
} as const
