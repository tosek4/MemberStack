export const styles = {
  container:
    'rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800',

  header: {
    title: 'text-lg font-semibold text-gray-900 dark:text-white',
    description: 'mt-1 text-sm text-gray-500 dark:text-gray-400',
  },

  form: 'mt-6 grid grid-cols-1 gap-5 md:grid-cols-2',

  field: {
    wrapper: 'flex flex-col gap-1.5',

    full: 'md:col-span-2',

    label: 'text-sm font-medium text-gray-700 dark:text-gray-300',

    input:
      'h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white',

    readOnly: 'cursor-not-allowed bg-gray-50 dark:bg-gray-800',

    select:
      'h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:disabled:bg-gray-800',

    error: 'text-xs text-red-500 dark:text-red-400',
  },

  searchWrapper: 'relative',

  searchIcon:
    'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400',

  searchInput:
    'h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm text-gray-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:disabled:bg-gray-800',

  memberList:
    'max-h-64 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-600',

  memberOption:
    'flex w-full items-center justify-between gap-4 border-b border-gray-100 px-4 py-3 text-left transition last:border-b-0 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700',

  memberOptionSelected:
    'bg-primary-50 hover:bg-primary-50 dark:bg-primary-950 dark:hover:bg-primary-950',

  memberInfo: 'flex min-w-0 flex-col gap-1',

  memberName: 'truncate text-sm font-medium text-gray-900 dark:text-white',

  memberEmail: 'truncate text-xs text-gray-500 dark:text-gray-400',

  memberPhone: 'truncate text-xs text-gray-500 dark:text-gray-400',

  memberPlan:
    'shrink-0 text-xs font-medium text-primary-600 dark:text-primary-400',

  emptyState: 'px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400',

  subscription:
    'rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700',

  subscriptionHeader: 'mb-4 text-sm font-medium text-gray-900 dark:text-white',

  subscriptionDetails: 'grid grid-cols-2 gap-4',

  subscriptionLabel: 'block text-xs text-gray-500 dark:text-gray-400',

  subscriptionValue:
    'mt-1 block text-sm font-medium text-gray-900 dark:text-white',

  actions:
    'mt-6 flex items-center justify-end gap-3 border-t border-gray-100 pt-5 dark:border-gray-700',

  cancel:
    'rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700',

  submit:
    'rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50',

  currentSubscription:
    'flex items-center justify-between gap-4 rounded-lg border border-primary-200 bg-primary-50 px-4 py-3 dark:border-primary-900 dark:bg-primary-950',

  currentSubscriptionLabel:
    'block text-xs text-primary-700 dark:text-primary-300',

  currentSubscriptionPlan:
    'mt-1 block text-sm font-semibold text-primary-900 dark:text-primary-100',

  currentSubscriptionDate: 'text-xs text-primary-700 dark:text-primary-300',
} as const
