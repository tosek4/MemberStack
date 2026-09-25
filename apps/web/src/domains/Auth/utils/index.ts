import { routeRoles } from '../routeRoles'

export const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
]

export const getDefaultRoute = (role: string): string => {
  const route = Object.entries(routeRoles).find(([, roles]) =>
    roles.includes(role as never),
  )

  return route?.[0] ?? '/login'
}
