export interface CreateRefreshTokenDto {
  token: string
  userId: number
  expiresAt: Date
  revokedAt?: Date
}
