export const styles = {
  root: 'relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700/80 dark:bg-gray-800/80',

  header: 'relative z-10 flex items-center justify-between',

  titleWrapper: 'flex min-w-0 items-center gap-3',

  icon: 'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-400',

  title:
    'truncate text-xs font-semibold uppercase tracking-[0.08em] text-gray-500 dark:text-gray-400',

  value:
    'relative z-10 mt-5 text-3xl font-bold tracking-tight text-gray-950 dark:text-white',

  footer: 'relative z-10 mt-3 flex items-center gap-2 text-xs',

  trend: {
    positive:
      'inline-flex items-center gap-0.5 font-semibold text-emerald-600 dark:text-emerald-400',

    negative:
      'inline-flex items-center gap-0.5 font-semibold text-rose-600 dark:text-rose-400',
  },

  description: 'text-gray-500 dark:text-gray-400',

  glow: 'pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-400/5',
} as const
