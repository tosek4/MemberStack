import { api } from '@services'
import { LoginRequest, LoginResponse } from '../types'

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', {
    email: data.email,
    password: data.password,
  })

  return response.data
}
