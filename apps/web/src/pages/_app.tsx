import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import '@globals.css'

import {
  AuthProvider,
  ThemeProvider,
  SidebarProvider,
  QueryProvider,
} from '@/providers'

import { Header } from '@/domains/Layout/Header'
import { Sidebar } from '@/domains/Layout/Sidebar'
import { AppLayout } from '@/domains/Layout/AppLayout'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const isAuthPage =
    router.pathname === '/login' ||
    router.pathname === '/register' ||
    router.pathname === '/forgot-password'

  return (
    <AuthProvider>
      <ThemeProvider>
        <QueryProvider>
          <SidebarProvider>
            {!isAuthPage && (
              <>
                <Header />
                <Sidebar />

                <AppLayout>
                  <Component {...pageProps} />
                </AppLayout>
              </>
            )}
            {isAuthPage && <Component {...pageProps} />}
          </SidebarProvider>
        </QueryProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}
