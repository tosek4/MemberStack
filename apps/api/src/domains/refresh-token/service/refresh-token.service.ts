import { injectable } from '@loopback/core'
import crypto from 'crypto'
import { CreateRefreshTokenDto } from '../types/dto'
import { RefreshTokenRepository } from '../repositories'
import { repository } from '@loopback/repository'

@injectable()
export class RefreshTokenService {
  constructor(
    @repository(RefreshTokenRepository)
    private refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async generateToken(accessToken: string) {
    const refreshToken = crypto.randomBytes(64).toString('hex')

    return {
      accessToken,
      refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    }
  }

  async create(data: CreateRefreshTokenDto) {
    await this.refreshTokenRepository.create(data)
  }
}
