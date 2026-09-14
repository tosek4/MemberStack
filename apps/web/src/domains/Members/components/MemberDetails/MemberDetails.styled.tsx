export const styles = {
  root: 'min-h-screen bg-gray-50 dark:bg-gray-900',

  container: 'mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8',

  header: {
    wrapper:
      'mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between',

    title: 'text-2xl font-bold tracking-tight text-gray-900 dark:text-white',

    subtitle: 'mt-1 text-sm text-gray-500 dark:text-gray-400',

    backButton:
      'text-sm font-medium text-primary-600 hover:underline dark:text-primary-400',
  },

  card: 'rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800',

  profile: {
    wrapper: 'flex flex-col gap-4 sm:flex-row sm:items-center',

    avatar:
      'flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-100 text-xl font-semibold text-primary-700 dark:bg-primary-900 dark:text-primary-200',

    image: 'h-full w-full object-cover',

    name: 'text-xl font-bold text-gray-900 dark:text-white',

    email: 'mt-1 text-sm text-gray-500 dark:text-gray-400',
  },

  details: {
    grid: 'mt-6 grid grid-cols-1 gap-5 border-t border-gray-200 pt-6 sm:grid-cols-2 dark:border-gray-700',

    label:
      'text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400',

    value: 'mt-1 text-sm font-medium text-gray-900 dark:text-white',
  },

  status: {
    base: 'inline-flex rounded-full px-2.5 py-1 text-xs font-medium',

    active:
      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',

    expiring:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',

    expired: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',

    noSubscription:
      'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  },
} as const
