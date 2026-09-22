export const styles = {
  root: 'rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm dark:border-gray-700/80 dark:bg-gray-800/80 sm:p-6',

  header: 'flex items-start justify-between',

  title: 'text-base font-semibold tracking-tight text-gray-950 dark:text-white',

  subtitle: 'mt-1 text-xs text-gray-500 dark:text-gray-400',

  headerIcon: 'text-cyan-600 dark:text-cyan-400',

  list: 'mt-5 divide-y divide-gray-100 dark:divide-gray-700/70',

  item: 'group flex cursor-pointer items-center gap-4 py-3 first:pt-0 last:pb-0 rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/30',

  avatar:
    'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-xs font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-200',

  member: 'flex min-w-0 flex-1 items-center gap-3',

  memberInfo: 'flex min-w-0 flex-col',

  memberName:
    'truncate text-sm font-medium text-gray-900 transition-colors group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-400',

  plan: 'mt-0.5 text-xs text-gray-500 dark:text-gray-400',

  payment: 'flex shrink-0 flex-col items-end',

  amount: 'text-sm font-semibold text-gray-900 dark:text-white',

  date: 'mt-0.5 text-xs text-gray-500 dark:text-gray-400',

  arrow:
    'shrink-0 text-gray-300 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-cyan-500 group-hover:opacity-100 dark:text-gray-600 dark:group-hover:text-cyan-400',

  empty: 'py-8 text-center text-sm text-gray-500 dark:text-gray-400',
} as const
