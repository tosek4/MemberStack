export interface CreateUserDto {
  firstName: string
  lastName: string
  email: string
  password: string
  phone?: string
  isActive?: boolean
  roleId: number
}

export interface UpdateUserDto {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  phone?: string
  isActive?: boolean
  roleId?: number
}

export interface Credentials {
  email: string
  password: string
}

export interface TokenPair {
  accessToken: string
  refreshToken: string
  expiresIn: string
}

export interface AuthResult extends TokenPair {
  user: {
    id?: number
    firstName: string
    lastName: string
    email: string
    phone?: string
    isActive: boolean
    roleId: number
  }
}

export interface AccessTokenPayload {
  sub: number
  email: string
  roleId: number
}

export interface RefreshTokenPayload {
  sub: number
  tokenId: number
}
