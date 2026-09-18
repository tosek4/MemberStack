export const styles = {
  overlay:
    'fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4',

  modal: 'w-full max-w-lg rounded-xl bg-white shadow-xl dark:bg-gray-900',

  header:
    'flex items-start justify-between gap-4 border-b border-gray-200 px-6 py-5 dark:border-gray-800',

  title: 'text-lg font-semibold text-gray-900 dark:text-white',

  description: 'mt-1 text-sm text-gray-500 dark:text-gray-400',

  closeButton:
    'rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-800 dark:hover:text-gray-200',

  form: 'space-y-5 p-6',

  field: 'space-y-2',

  label: 'block text-sm font-medium text-gray-700 dark:text-gray-300',

  searchWrapper: 'relative',

  searchIcon:
    'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400',

  searchInput:
    'w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:disabled:bg-gray-800',

  memberList:
    'max-h-64 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700',

  memberOption:
    'flex w-full items-center justify-between gap-4 border-b border-gray-100 px-4 py-3 text-left transition last:border-b-0 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800',

  memberOptionSelected:
    'bg-cyan-50 hover:bg-cyan-50 dark:bg-cyan-950 dark:hover:bg-cyan-950',

  memberInfo: 'flex min-w-0 flex-col gap-1',

  memberName: 'truncate text-sm font-medium text-gray-900 dark:text-white',

  memberEmail: 'truncate text-xs text-gray-500 dark:text-gray-400',

  memberPlan: 'shrink-0 text-xs font-medium text-cyan-600 dark:text-cyan-400',

  emptyState: 'px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400',

  subscription:
    'rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800',

  subscriptionHeader: 'mb-3 text-sm font-medium text-gray-900 dark:text-white',

  subscriptionTitle: 'font-medium',

  subscriptionDetails: 'grid grid-cols-2 gap-4',

  subscriptionLabel: 'block text-xs text-gray-500 dark:text-gray-400',

  subscriptionValue:
    'mt-1 block text-sm font-medium text-gray-900 dark:text-white',

  error: 'text-sm text-red-500 dark:text-red-400',

  actions:
    'flex justify-end gap-3 border-t border-gray-200 pt-5 dark:border-gray-800',

  cancelButton:
    'rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800',

  button:
    'rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50',
}
