export const styles = {
  page: 'min-h-screen bg-gray-50 p-6 dark:bg-gray-900',

  container: 'mx-auto max-w-7xl',

  header:
    'mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between',

  title: 'text-2xl font-bold text-gray-900 dark:text-white',

  description: 'mt-1 text-sm text-gray-500 dark:text-gray-400',

  addButton:
    'inline-flex h-10 items-center justify-center rounded-lg bg-primary-600 px-4 text-sm font-medium text-white transition hover:bg-primary-700',

  stats: 'mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4',

  statCard:
    'rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800',

  statLabel: 'text-sm font-medium text-gray-500 dark:text-gray-400',

  statValue: 'mt-2 text-2xl font-bold text-gray-900 dark:text-white',

  statDescription: 'mt-1 text-xs text-gray-500 dark:text-gray-400',

  paymentsSection: 'mt-6',

  sectionHeader: 'mb-4 flex items-center justify-between',

  sectionTitle: 'text-lg font-semibold text-gray-900 dark:text-white',

  paymentGrid: 'mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2',

  empty:
    'rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-gray-600 dark:bg-gray-800',

  emptyTitle: 'text-sm font-semibold text-gray-900 dark:text-white',

  emptyDescription: 'mt-1 text-sm text-gray-500 dark:text-gray-400',
} as const
