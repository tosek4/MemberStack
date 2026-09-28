import React from 'react'
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { QueryProviderProps } from './types'
import { getApiErrorMessage } from '@/utils/apiError'
import { notifications } from '@/utils/notifications'

interface ErrorMeta extends Record<string, unknown> {
  skipGlobalError?: boolean
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error, query) => {
            const meta = query.meta as ErrorMeta | undefined

            if (meta?.skipGlobalError) {
              return
            }

            const message = getApiErrorMessage(error)

            if (message) {
              notifications.error(message)
            }
          },
        }),

        mutationCache: new MutationCache({
          onError: (error, _variables, _context, mutation) => {
            const meta = mutation.options.meta as ErrorMeta | undefined

            if (meta?.skipGlobalError) {
              return
            }

            const message = getApiErrorMessage(error)

            if (message) {
              notifications.error(message)
            }
          },
        }),

        defaultOptions: {
          queries: {
            staleTime: 30 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
