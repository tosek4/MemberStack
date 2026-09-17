export const styles = {
  overlay:
    'fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4',

  modal: 'w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900',

  header: 'flex items-center justify-between gap-4',

  title: 'text-lg font-semibold text-gray-900 dark:text-white',

  closeButton:
    'text-2xl leading-none text-gray-400 transition hover:text-gray-600 disabled:cursor-not-allowed dark:hover:text-gray-200',

  description: 'mt-3 text-sm text-gray-600 dark:text-gray-400',

  content: 'mt-4',

  actions: 'mt-6 flex justify-end gap-3',

  cancelButton:
    'rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800',

  confirmButton:
    'rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50',
}
