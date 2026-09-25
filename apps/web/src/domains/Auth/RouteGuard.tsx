import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

import { useAuth } from '@/providers'

import { routeRoles } from './routeRoles'
import { publicRoutes } from './utils'

const getBaseRoute = (pathname: string) => {
  return Object.keys(routeRoles).find(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  )
}

export const RouteGuard: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const router = useRouter()

  const { user, isAuthenticated, isLoading } = useAuth()

  const pathname = router.asPath.split('?')[0]

  const isPublicRoute = publicRoutes.includes(pathname)

  useEffect(() => {
    if (isLoading || isPublicRoute) {
      return
    }

    if (!isAuthenticated) {
      router.replace('/login')
      return
    }

    const baseRoute = getBaseRoute(pathname)

    if (!baseRoute) {
      return
    }

    const allowedRoles = routeRoles[baseRoute as keyof typeof routeRoles]

    const userRole = user?.role?.name

    if (!userRole || !allowedRoles.includes(userRole as never)) {
      router.replace('/403')
    }
  }, [isLoading, isAuthenticated, isPublicRoute, pathname, user, router])

  if (isLoading) {
    return null
  }

  if (!isPublicRoute && !isAuthenticated) {
    return null
  }

  if (isPublicRoute) {
    return <>{children}</>
  }

  const baseRoute = getBaseRoute(pathname)

  if (baseRoute) {
    const allowedRoles = routeRoles[baseRoute as keyof typeof routeRoles]

    const userRole = user?.role?.name

    if (!userRole || !allowedRoles.includes(userRole as never)) {
      return null
    }
  }

  return <>{children}</>
}
