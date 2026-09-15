export interface AuthUser {
  id: number
  firstName: string
  lastName: string
  email: string
  isActive: boolean
  roleId: number
  role: {
    id: number
    name: string
    description: string
  }
}

export interface LoginRequest {
  email: string
  password: string
  remember?: boolean
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  accessTokenExpiry: number
  user: AuthUser
}
