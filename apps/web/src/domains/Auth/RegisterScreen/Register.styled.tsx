export const styles = {
  layout: {
    section: 'bg-gray-50 dark:bg-gray-900',

    container:
      'mx-auto flex min-h-screen flex-col items-center justify-center px-6 py-8 lg:py-0',
  },

  card: {
    root: 'w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0',

    body: 'space-y-4 p-6 sm:p-8 md:space-y-6',
  },

  heading: {
    title:
      'text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl',
  },

  form: {
    root: 'space-y-4 md:space-y-6',

    row: 'grid grid-cols-1 gap-4 sm:grid-cols-2',

    field: 'space-y-1',

    label: 'mb-2 block text-sm font-medium text-gray-900 dark:text-white',

    input:
      'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 placeholder-gray-400 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
  },

  terms: {
    wrapper: 'flex items-start gap-3',

    checkbox:
      'mt-1 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800',

    label: 'text-sm text-gray-500 dark:text-gray-300',
  },

  submit: {
    button:
      'w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800',
  },

  signin: {
    text: 'text-sm font-light text-gray-500 dark:text-gray-400',

    link: 'font-medium text-primary-600 hover:underline dark:text-primary-500',
  },
}
