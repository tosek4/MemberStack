export type UserRole = 'super_admin' | 'admin' | 'receptionist' | 'trainer'

export type UserStatus = 'active' | 'inactive'

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone?: string
  role: UserRole
  isActive: boolean
  lastLogin?: string
  avatar?: string
}

export interface UserFilters {
  search: string
  role: UserRole | 'all'
  status: UserStatus | 'all'
}

export interface CreateUserPayload {
  firstName: string
  lastName: string
  password: string
  email: string
  phone?: string
  roleId: number
  status: boolean
  lastLogin?: string
  avatar?: string
}

export interface UpdateUserPayload {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  roleId?: number
  status?: boolean
  lastLogin?: string
  avatar?: string
}

export interface Role {
  id: number
  name: string
  description?: string
}
