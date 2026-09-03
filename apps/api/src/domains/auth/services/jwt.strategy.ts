import { inject, injectable } from '@loopback/core'
import { AuthenticationStrategy, TokenService } from '@loopback/authentication'
import { Request } from '@loopback/rest'
import { UserProfile } from '../../user/types/user-profile'
import { TokenServiceBindings } from '@loopback/authentication-jwt'

@injectable()
export class JWTStrategy implements AuthenticationStrategy {
  name = 'jwt'

  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public tokenService: TokenService,
  ) {}

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = this.extractToken(request)
    if (!token) {
      return undefined
    }

    try {
      const userProfile = await this.tokenService.verifyToken(token)

      return userProfile
    } catch (err) {
      console.error('🔥 JWT Strategy - Verification failed:', err)
      return undefined
    }
  }

  private extractToken(request: Request): string | undefined {
    const authHeader = request.headers.authorization
    if (!authHeader) return undefined

    const parts = authHeader.split(' ')
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return undefined
    }

    return parts[1]
  }
}
