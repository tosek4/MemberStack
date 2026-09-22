export const styles = {
  root: 'flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between',

  eyebrow:
    'mb-2 flex items-center gap-2 text-s font-semibold uppercase tracking-[0.16em] text-cyan-600 dark:text-cyan-400',

  statusDot:
    'h-1.5 w-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]',

  title:
    'text-2xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-3xl',

  subtitle: 'mt-1 text-sm text-gray-500 dark:text-gray-400',

  periodButton:
    'inline-flex h-10 items-center gap-2 self-start rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 sm:self-auto dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-600 dark:hover:bg-gray-750',

  periodArrow: 'ml-1 text-gray-400',
} as const
