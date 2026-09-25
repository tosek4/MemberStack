import Link from 'next/link'
import { ArrowLeft, ShieldAlert } from 'lucide-react'

export default function ForbiddenPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6 dark:bg-gray-950">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-500">
          <ShieldAlert size={32} />
        </div>

        <h1 className="mt-6 text-4xl font-black text-gray-900 dark:text-white">
          Access denied
        </h1>

        <p className="mt-3 text-gray-600 dark:text-gray-400">
          You don&apos;t have permission to access this page.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-600"
        >
          <ArrowLeft size={18} />
          Go back
        </Link>
      </div>
    </main>
  )
}
