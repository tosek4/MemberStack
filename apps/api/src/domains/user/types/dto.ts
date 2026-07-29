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



export interface RefreshTokenPayload {
  sub: number
  tokenId: number
}
