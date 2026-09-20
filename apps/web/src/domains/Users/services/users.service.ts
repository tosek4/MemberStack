import { api } from '@/services'
import { User, CreateUserPayload, UpdateUserPayload, Role } from '../types'

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>('/users')

  return response.data
}

export const getUsersById = async (id: number): Promise<User> => {
  const response = await api.get<User>(`/users/${id}`)

  return response.data
}

export const createUser = async (
  data: CreateUserPayload,
): Promise<CreateUserPayload> => {
  const response = await api.post<CreateUserPayload>('/auth/register', data)

  return response.data
}

export const updateUser = async (
  id: number,
  data: UpdateUserPayload,
): Promise<User> => {
  const response = await api.patch<User>(`/users/${id}`, data)

  return response.data
}

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`)
}

export const getRoles = async (): Promise<Role[]> => {
  const response = await api.get<Role[]>('/roles')

  return response.data
}
