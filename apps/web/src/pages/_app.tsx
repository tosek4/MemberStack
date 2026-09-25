import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import '@globals.css'

import {
  AuthProvider,
  ThemeProvider,
  SidebarProvider,
  QueryProvider,
} from '@/providers'

import { RouteGuard } from '@/domains/Auth/RouteGuard'

import { Header } from '@/domains/Layout/Header'
import { Sidebar } from '@/domains/Layout/Sidebar'
import { AppLayout } from '@/domains/Layout/AppLayout'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const isPublicRoute =
    router.pathname === '/' ||
    router.pathname === '/login' ||
    router.pathname === '/register' ||
    router.pathname === '/forgot-password' ||
    router.pathname === '/reset-password'

  return (
    <AuthProvider>
      <ThemeProvider>
        <QueryProvider>
          <SidebarProvider>
            <RouteGuard>
              {isPublicRoute ? (
                <Component {...pageProps} />
              ) : (
                <>
                  <Header />
                  <Sidebar />

                  <AppLayout>
                    <Component {...pageProps} />
                  </AppLayout>
                </>
              )}
            </RouteGuard>
          </SidebarProvider>
        </QueryProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}
