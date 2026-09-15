export const styles = {
  root: 'min-h-screen p-6',

  container: 'mx-auto max-w-4xl',

  header: {
    wrapper: 'mb-6 flex items-center justify-between gap-4',
    content: '',
    title: 'text-2xl font-semibold text-gray-900 dark:text-white',
    subtitle: 'mt-1 text-sm text-gray-500 dark:text-gray-400',
  },

  backButton:
    'rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800',

  card: 'rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900',

  section: {
    wrapper: 'border-b border-gray-200 pb-6 dark:border-gray-800',
    last: 'pt-6',
    title: 'mb-4 text-lg font-semibold text-gray-900 dark:text-white',
  },

  member: {
    wrapper: 'flex items-center gap-4',
    avatar:
      'flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-lg font-semibold text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
    info: '',
    name: 'text-lg font-semibold text-gray-900 dark:text-white',
    email: 'mt-1 text-sm text-gray-500 dark:text-gray-400',
  },

  status: 'inline-flex rounded-full px-3 py-1 text-sm font-medium',

  statusStyles: {
    active:
      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    expiring:
      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    expired: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  },

  grid: 'grid grid-cols-1 gap-6 sm:grid-cols-2',

  detail: {
    label: 'text-sm text-gray-500 dark:text-gray-400',
    value: 'mt-1 text-base font-medium text-gray-900 dark:text-white',
  },

  actions: {
    wrapper: 'mt-6 flex justify-end gap-3',
    renew:
      'rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50',
  },
}
