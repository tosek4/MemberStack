export const styles = {
  overlay:
    'fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4',

  modal: 'w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900',

  header: 'mb-6 flex items-start justify-between gap-4',

  title: 'text-xl font-semibold text-gray-900 dark:text-white',

  description: 'mt-1 text-sm text-gray-500 dark:text-gray-400',

  closeButton:
    'rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800',

  form: 'space-y-4',

  row: 'grid grid-cols-1 gap-4 sm:grid-cols-2',

  field: 'space-y-1',

  label: 'block text-sm font-medium text-gray-700 dark:text-gray-300',

  input:
    'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white',

  error: 'text-sm text-red-500',

  actions: 'flex justify-end gap-3 pt-4',

  cancelButton:
    'rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800',

  submitButton:
    'rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50',
}
