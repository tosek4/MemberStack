export const styles = {
  overlay:
    'fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4',

  modal: 'w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-gray-800',

  header: 'mb-5',

  title: 'text-lg font-semibold text-gray-900 dark:text-white',

  description: 'mt-1 text-sm text-gray-500 dark:text-gray-400',

  field: 'flex flex-col gap-2',

  label: 'text-sm font-medium text-gray-700 dark:text-gray-200',

  select:
    'w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white',

  actions: 'mt-6 flex justify-end gap-3',

  cancelButton:
    'rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700',

  confirmButton:
    'rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50',
}
