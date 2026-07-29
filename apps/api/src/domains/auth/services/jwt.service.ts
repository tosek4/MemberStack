import { inject } from '@loopback/core'
import { HttpErrors } from '@loopback/rest'
import { TokenServiceBindings } from '@loopback/authentication-jwt'
import { securityId, UserProfile } from '@loopback/security'
import { promisify } from 'util'
import { AccessTokenPayload, AccessTokenResponse } from '../types/dto'
import { verify } from 'jsonwebtoken'
import { JWT_EXPIRES_IN, JWT_SECRET } from '../key'

const jwt = require('jsonwebtoken')
const signAsync = promisify(jwt.sign)
const verifyAsync = promisify(jwt.verify)

export class JwtService {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SECRET)
    private jwtSecret: string,
    @inject(TokenServiceBindings.TOKEN_EXPIRES_IN)
    private jwtExpiresIn: string,
  ) {}

  async generateAccessToken(userProfile: UserProfile): Promise<string> {
    if (!userProfile) {
      throw new HttpErrors.Unauthorized(
        'Error generating token : userProfile is null',
      )
    }
    const userInfoForToken = {
      id: userProfile[securityId as typeof securityId],
      name: userProfile.name,
      email: userProfile.email,
      ...userProfile,
    }
    // Generate a JSON Web Token
    let token: string
    try {
      token = await signAsync(userInfoForToken, this.jwtSecret, {
        expiresIn: Number(this.jwtExpiresIn),
      })
    } catch (error) {
      throw new HttpErrors.Unauthorized(`Error encoding token : ${error}`)
    }

    return token
  }

  verifyAccessToken(token: string): AccessTokenResponse {
    try {
      return verify(token, this.jwtSecret) as unknown as AccessTokenResponse
    } catch {
      throw new HttpErrors.Unauthorized('Invalid or expired access token')
    }
  }
}
