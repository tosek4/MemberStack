export const styles = {
  overlay:
    'fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4',

  modal: 'w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900',

  header: 'mb-5 flex items-start justify-between gap-4',

  title: 'text-xl font-semibold text-gray-900 dark:text-white',

  subtitle: 'mt-1 text-sm text-gray-500 dark:text-gray-400',

  closeButton:
    'rounded-md px-2 text-2xl leading-none text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-white',

  scanner: 'relative aspect-video w-full overflow-hidden rounded-lg bg-black',

  video: 'h-full w-full object-cover',

  scanFrame:
    'pointer-events-none absolute left-1/2 top-1/2 aspect-square w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-xl border-2 border-cyan-400',

  message: 'mt-4 text-center text-sm text-gray-500 dark:text-gray-400',

  error:
    'mt-4 rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400',

  actions: 'mt-5 flex justify-end',

  cancelButton:
    'rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800',
}
