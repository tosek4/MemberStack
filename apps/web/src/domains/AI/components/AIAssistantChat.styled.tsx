export const styles = {
  container:
    'flex h-full min-h-[600px] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900',

  header: 'border-b border-gray-200 p-5 dark:border-gray-700',

  title: 'text-xl font-semibold text-gray-900 dark:text-white',

  subtitle: 'mt-1 text-sm text-gray-500 dark:text-gray-400',

  messages: 'flex-1 space-y-4 overflow-y-auto p-5',

  emptyState: 'mx-auto mt-12 max-w-lg text-center',

  emptyTitle: 'text-lg font-medium text-gray-900 dark:text-white',

  emptyDescription: 'mt-2 text-sm text-gray-500 dark:text-gray-400',

  suggestions: 'mt-6 flex flex-wrap justify-center gap-2',

  suggestion:
    'rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800',

  messageRow: 'flex',

  userMessage: 'justify-end',

  assistantMessage: 'justify-start',

  message: 'max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm',

  userMessageContent: 'bg-cyan-600 text-white',

  assistantMessageContent:
    'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100',

  loadingRow: 'flex justify-start',

  loadingMessage:
    'rounded-2xl bg-gray-100 px-4 py-3 text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-400',

  error:
    'rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300',

  form: 'flex items-end gap-3 border-t border-gray-200 p-4 dark:border-gray-700',

  textarea:
    'min-h-12 flex-1 resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 disabled:opacity-60 dark:border-gray-700 dark:bg-gray-950 dark:text-white',

  sendButton:
    'rounded-lg bg-cyan-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50',
}
