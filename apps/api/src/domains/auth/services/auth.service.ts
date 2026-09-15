import { inject } from '@loopback/core'
import { USERS_SERVICE } from '../../user/keys'
import { UserService } from '../../user/service'
import { CreateUserDto, Credentials, RefreshTokenResult } from '../types/dto'
import { HttpErrors } from '@loopback/rest'
import { PasswordHasherService } from './password-hasher.service'
import { securityId } from '@loopback/security'
import { getAccessTokenExpiry } from '../utils/get-access-token-expiry'
import { AppRole } from '../../../enums/app-role.enum'
import { TokenService } from '@loopback/authentication'
import { RefreshTokenService } from '../../refresh-token/service/refresh-token.service'
import { PASSWORD_HASHER, JWT_EXPIRES_IN, JWT_SERVICE } from '../key'

export class AuthService {
  constructor(
    @inject(USERS_SERVICE)
    private userService: UserService,

    @inject(PASSWORD_HASHER)
    private passwordHasherService: PasswordHasherService,

    @inject('services.refreshToken')
    private refreshTokenService: RefreshTokenService,

    @inject(JWT_EXPIRES_IN)
    private tokenExpiresIn: string,

    @inject(JWT_SERVICE)
    public jwtService: TokenService,
  ) {}

  async register(user: CreateUserDto) {
    const userExists = await this.userService.findByEmail(user.email)
    if (userExists) {
      throw new HttpErrors.BadRequest('User already exists.')
    }
    const passwordHash = await this.passwordHasherService.hashPassword(
      user.password,
    )

    const createdUser = await this.userService.create({
      ...user,
      password: passwordHash,
    })

    return createdUser
  }

  async login(credentials: Credentials) {
    const user = await this.userService.findByEmail(credentials.email)
    if (!user) {
      throw new HttpErrors.Unauthorized('Invalid email or password.')
    }
    if (!user.isActive) {
      throw new HttpErrors.Unauthorized('User is not active.')
    }

    const passwordMatched = await this.passwordHasherService.comparePassword(
      credentials.password,
      user.passwordHash,
    )

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized('Invalid email or password.')
    }

    const payload = {
      name: user.email,
      email: user.email,
      role: user.role?.name as AppRole,
      [securityId]: user.id.toString(),
    }
    const accessToken = await this.jwtService.generateToken(payload)
    const tokens = await this.refreshTokenService.generateToken()

    await this.refreshTokenService.create({
      token: tokens.refreshToken,
      userId: user.id,
      expiresAt: tokens.expiresAt,
    })
    await this.userService.updateUserToken(
      user.id,
      credentials.deviceToken ?? '',
    )

    const accessTokenExpiryAt = getAccessTokenExpiry(
      parseInt(this.tokenExpiresIn),
    )
    const { passwordHash, ...userData } = user

    return {
      accessToken,
      refreshToken: tokens.refreshToken,
      accessTokenExpiry: accessTokenExpiryAt,
      user: {
        ...userData,
      },
    }
  }

  async refresh(refreshToken: string): Promise<RefreshTokenResult> {
    const refreshTokenDB =
      await this.refreshTokenService.findByToken(refreshToken)

    if (!refreshTokenDB) {
      throw new HttpErrors.Unauthorized('Invalid refresh token.')
    }

    if (refreshTokenDB.revokedAt) {
      throw new HttpErrors.Unauthorized('Refresh token has been revoked.')
    }

    if (new Date(refreshTokenDB.expiresAt) <= new Date()) {
      throw new HttpErrors.Unauthorized('Refresh token has expired.')
    }

    const user = await this.userService.findById(refreshTokenDB.userId)

    if (!user) {
      throw new HttpErrors.Unauthorized('User not found.')
    }

    if (!user.isActive) {
      throw new HttpErrors.Unauthorized('User is not active.')
    }

    const payload = {
      name: user.email,
      email: user.email,
      role: user.role?.name as AppRole,
      [securityId]: user.id.toString(),
    }

    const accessToken = await this.jwtService.generateToken(payload)

    const accessTokenExpiry = getAccessTokenExpiry(
      parseInt(this.tokenExpiresIn),
    )

    return {
      accessToken,
      accessTokenExpiry,
    }
  }
}
