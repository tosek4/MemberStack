import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import '@globals.css'
import { AuthProvider, ThemeProvider } from '@/providers'
import { Header } from '@/components/Header'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const isAuthPage =
    router.pathname === '/login' || router.pathname === '/register'

  return (
    <AuthProvider>
      <ThemeProvider>
        {!isAuthPage && <Header />}

        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  )
}
