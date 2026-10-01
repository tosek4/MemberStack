export const styles = {
  root: 'min-h-full',

  container: 'mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8',

  content: 'space-y-6',

  analytics:
    'grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.65fr)]',

  bottom: 'grid grid-cols-1 gap-6 xl:grid-cols-2',

  aiButton:
    'fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-cyan-600 px-5 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-cyan-700 hover:shadow-xl',
} as const
