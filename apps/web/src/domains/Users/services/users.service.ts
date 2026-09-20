import { api } from '@/services'
import {
  User,
  CreateUserPayload,
  UpdateUserPayload,
  Role,
  UserFilters,
} from '../types'

export const userService = {
  getUsers: async (filters?: UserFilters): Promise<User[]> => {
    const params = new URLSearchParams()

    if (filters?.search?.trim()) {
      params.set('search', filters.search.trim())
    }

    if (filters?.role && filters.role !== 'all') {
      params.set('role', filters.role.toString())
    }

    if (filters?.status && filters.status !== 'all') {
      params.set('status', filters.status)
    }

    const query = params.toString()

    const response = await api.get<User[]>(`/users${query ? `?${query}` : ''}`)

    return response.data
  },

  getUsersById: async (id: number): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`)

    return response.data
  },

  createUser: async (data: CreateUserPayload): Promise<CreateUserPayload> => {
    const response = await api.post<CreateUserPayload>('/auth/register', data)

    return response.data
  },

  updateUser: async (id: number, data: UpdateUserPayload): Promise<User> => {
    const response = await api.patch<User>(`/users/${id}`, data)

    return response.data
  },

  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`)
  },

  getRoles: async (): Promise<Role[]> => {
    const response = await api.get<Role[]>('/roles')

    return response.data
  },
}
