import { api } from '@services'
import { LoginRequest, LoginResponse, RefreshTokenResponse } from '../types'

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', {
    email: data.email,
    password: data.password,
  })

  return response.data
}



export const refreshAccessToken = async (
  refreshToken: string,
): Promise<RefreshTokenResponse> => {
  const response = await api.post<RefreshTokenResponse>('/auth/refresh', {
    refreshToken,
  })

  return response.data
}
