export const styles = {
  page: 'min-h-screen bg-gray-50 p-6 dark:bg-gray-900',

  container: 'mx-auto max-w-7xl',

  header: 'mb-6',

  title: 'text-2xl font-bold text-gray-900 dark:text-white',

  description: 'mt-1 text-sm text-gray-500 dark:text-gray-400',

  stats: 'mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4',

  statCard:
    'flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800',

  statIcon:
    'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400',

  statLabel: 'text-sm font-medium text-gray-500 dark:text-gray-400',

  statValue: 'mt-1 text-2xl font-bold text-gray-900 dark:text-white',

  checkInSection: 'mb-6',

  history: 'mt-6',

  sectionHeader: 'mb-4',

  sectionTitle: 'text-lg font-semibold text-gray-900 dark:text-white',

  grid: 'mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2',

  empty:
    'mt-4 rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-gray-600 dark:bg-gray-800',

  emptyTitle: 'text-sm font-semibold text-gray-900 dark:text-white',

  emptyDescription: 'mt-1 text-sm text-gray-500 dark:text-gray-400',
} as const
