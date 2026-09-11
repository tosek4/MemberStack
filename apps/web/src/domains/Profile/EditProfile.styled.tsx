export const styles = {
  card: {
    root: 'rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800',

    body: 'p-6 sm:p-8',
  },

  heading: {
    title:
      'text-xl font-semibold text-gray-900 dark:text-white',

    description:
      'mt-1 text-sm text-gray-500 dark:text-gray-400',
  },

  form: {
    root: 'mt-6 space-y-6',

    grid: 'grid gap-6 md:grid-cols-2',

    field: 'space-y-1',

    label:
      'mb-2 block text-sm font-medium text-gray-900 dark:text-white',

    input:
      'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 placeholder-gray-400 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
  },

  submit: {
    wrapper: 'flex justify-end',

    button:
      'rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800',
  },
} as const