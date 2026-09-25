export const routeRoles = {
  '/dashboard': ['reception', 'manager', 'admin', 'superAdmin'],
  '/members': ['reception', 'manager', 'trainer', 'admin', 'superAdmin'],
  '/membershipPlans': ['admin', 'superAdmin'],
  '/subscription': ['reception', 'manager', 'admin', 'superAdmin'],
  '/attendance': ['reception', 'manager', 'trainer', 'admin', 'superAdmin'],
  '/payments': ['reception', 'manager', 'admin', 'superAdmin'],
  '/users': ['admin', 'superAdmin'],
  '/settings': ['admin', 'superAdmin'],
} as const
