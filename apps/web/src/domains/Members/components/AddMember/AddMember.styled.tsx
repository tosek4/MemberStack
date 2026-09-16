export const styles = {
  root: 'min-h-screen bg-gray-50 dark:bg-gray-900',

  container: 'mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8',

  header: {
    wrapper: 'mb-6',

    title: 'text-2xl font-bold tracking-tight text-gray-900 dark:text-white',

    subtitle: 'mt-1 text-sm text-gray-500 dark:text-gray-400',
  },

  card: 'rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800',

  form: {
    root: 'space-y-6',

    grid: 'grid grid-cols-1 gap-5 sm:grid-cols-2',

    field: 'space-y-2',

    fullWidth: 'sm:col-span-2',

    label: 'block text-sm font-medium text-gray-900 dark:text-white',

    input:
      'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400',

    select:
      'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white',
  },

  actions: {
    wrapper:
      'flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end dark:border-gray-700',

    cancel:
      'rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',

    submit:
      'rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800',
  },
  error: {
    text: 'text-sm text-red-600 dark:text-red-500',
  },
} as const
