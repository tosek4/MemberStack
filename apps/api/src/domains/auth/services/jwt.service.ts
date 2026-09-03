import { inject } from '@loopback/core'
import { HttpErrors } from '@loopback/rest'
import { TokenService } from '@loopback/authentication'
import { securityId } from '@loopback/security'
import { promisify } from 'util'
import { JWT_SECRET, JWT_EXPIRES_IN } from '../key'
import { UserProfile } from '../../user/types/user-profile'

const jwt = require('jsonwebtoken')
const signAsync = promisify(jwt.sign)
const verifyAsync = promisify(jwt.verify)

export class JwtService implements TokenService {
  constructor(
    @inject(JWT_SECRET)
    private jwtSecret: string,

    @inject(JWT_EXPIRES_IN)
    private jwtExpiresIn: string,
  ) {}

  async generateToken(userProfile: UserProfile): Promise<string> {
    if (!userProfile) {
      throw new HttpErrors.Unauthorized(
        'Error generating token : userProfile is null',
      )
    }

    const userInfoForToken = {
      id: userProfile[securityId],
      name: userProfile.name,
      email: userProfile.email,
      role: userProfile.role,
    }

    try {
      return await signAsync(userInfoForToken, this.jwtSecret, {
        expiresIn: this.jwtExpiresIn,
      })
    } catch (error) {
      throw new HttpErrors.Unauthorized(`Error encoding token : ${error}`)
    }
  }

  async verifyToken(token: string): Promise<UserProfile> {

    if (!token) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token : 'token' is null`,
      )
    }

    try {
      const decodedToken = await verifyAsync(token, this.jwtSecret)
      const userProfile: UserProfile = {
        [securityId]: String(decodedToken.id),
        id: String(decodedToken.id),
        name: decodedToken.name,
        email: decodedToken.email,
        role: decodedToken.role,
      }


      return userProfile
    } catch (error) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token : ${error.message}`,
      )
    }
  }
}
