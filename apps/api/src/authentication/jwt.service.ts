import { BindingScope, inject, injectable } from '@loopback/core'
import { HttpErrors } from '@loopback/rest'
import { sign, verify, SignOptions } from 'jsonwebtoken'
import { AuthBindings } from './keys'
import {
  AccessTokenPayload,
  RefreshTokenPayload,
} from '../domains/user/types'

@injectable({ scope: BindingScope.TRANSIENT })
export class JwtService {
  constructor(
    @inject(AuthBindings.TOKEN_SECRET)
    private tokenSecret: string,
    @inject(AuthBindings.TOKEN_EXPIRES_IN)
    private expiresIn: string,
    @inject(AuthBindings.REFRESH_SECRET)
    private refreshSecret: string,
  ) {}

  generateAccessToken(payload: AccessTokenPayload): string {
    const options: SignOptions = {
      expiresIn: this.expiresIn as SignOptions['expiresIn'],
    }
    return sign(payload, this.tokenSecret, options)
  }

  verifyAccessToken(token: string): AccessTokenPayload {
    try {
      return verify(token, this.tokenSecret) as unknown as AccessTokenPayload
    } catch {
      throw new HttpErrors.Unauthorized('Invalid or expired access token')
    }
  }

  generateRefreshToken(payload: RefreshTokenPayload, expiresIn: string): string {
    const options: SignOptions = {
      expiresIn: expiresIn as SignOptions['expiresIn'],
    }
    return sign(payload, this.refreshSecret, options)
  }

  verifyRefreshToken(token: string): RefreshTokenPayload {
    try {
      return verify(token, this.refreshSecret) as unknown as RefreshTokenPayload
    } catch {
      throw new HttpErrors.Unauthorized('Invalid or expired refresh token')
    }
  }
}
