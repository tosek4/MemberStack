export const styles = {
  root: 'min-h-screen bg-gray-50 p-6 dark:bg-gray-900',

  header: {
    wrapper: 'mb-6',

    title: 'text-2xl font-bold text-gray-900 dark:text-white',

    subtitle: 'mt-1 text-sm text-gray-500 dark:text-gray-400',
  },

  section:
    'mb-6 rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800',

  sectionHeader: 'border-b border-gray-200 p-6 dark:border-gray-700',

  sectionTitle: 'text-lg font-semibold text-gray-900 dark:text-white',

  sectionDescription: 'mt-1 text-sm text-gray-500 dark:text-gray-400',

  sectionBody: 'p-6',

  footer:
    'flex justify-end gap-3 border-t border-gray-200 pt-6 dark:border-gray-700',

  button: {
    cancel:
      'rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700',

    save: 'rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 disabled:cursor-not-allowed disabled:opacity-50',
  },
} as const
