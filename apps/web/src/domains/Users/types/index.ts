export type UserRole = 'super_admin' | 'admin' | 'receptionist' | 'trainer'

export type UserStatus = 'active' | 'inactive'

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone?: string
  role: Role
  isActive: boolean
  lastLogin?: string
  avatar?: string
  roleId: number
}

export interface UserFilters {
  search?: string
  role?: string | 'all'
  status?: UserStatus | 'all'
}

export interface CreateUserPayload {
  firstName: string
  lastName: string
  password: string
  email: string
  phone?: string
  roleId: number
  isActive: boolean
  lastLogin?: string
  avatar?: string
}

export interface UpdateUserPayload {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  roleId?: number
  isActive?: boolean
  lastLogin?: string
  avatar?: string
}

export interface Role {
  id: number
  name: string
  description?: string
}
