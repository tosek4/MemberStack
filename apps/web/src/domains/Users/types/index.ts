export type UserRole = 'super_admin' | 'admin' | 'receptionist' | 'trainer'

export type UserStatus = 'active' | 'inactive'

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: UserRole
  status: UserStatus
  lastLogin?: string
  avatar?: string
}

export interface UserFilters {
  search: string
  role: UserRole | 'all'
  status: UserStatus | 'all'
}
