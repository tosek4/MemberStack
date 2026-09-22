export const styles = {
  base: 'rounded-full px-2.5 py-1 text-xs font-medium',

  active:
    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',

  inactive: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',

  pending:
    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',

  expired: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',

  expiring:
    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',

  suspended:
    'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',

  blocked: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',

  noSubscription:
    'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
} as const
