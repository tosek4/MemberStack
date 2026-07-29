import { inject } from '@loopback/core'
import { USERS_SERVICE } from '../../user/keys'
import { UserService } from '../../user/service'
import { CreateUserDto, Credentials } from '../types/dto'
import { HttpErrors } from '@loopback/rest'
import { PasswordHasherService } from './password-hasher.service'
import { JwtService } from './jwt.service'
import { securityId } from '@loopback/security'
import { JWT_SERVICE, PASSWORD_HASHER } from '../key'
import { RefreshTokenService } from '../../refresh-token/service/refresh-token.service'
import { getAccessTokenExpiry } from '../utils/get-access-token-expiry'
import { TokenServiceBindings } from '@loopback/authentication-jwt'

export class AuthService {
  constructor(
    @inject(USERS_SERVICE)
    private userService: UserService,
    @inject(PASSWORD_HASHER)
    private passwordHasherService: PasswordHasherService,
    @inject(JWT_SERVICE)
    private jwtService: JwtService,
    @inject('services.refreshToken')
    private refreshTokenService: RefreshTokenService,
    @inject(TokenServiceBindings.TOKEN_EXPIRES_IN)
    private tokenExpiresIn: string,
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
      [securityId]: user.id.toString(),
    }

    const accessToken = await this.jwtService.generateAccessToken(payload)
    const tokens = await this.refreshTokenService.generateToken(accessToken)

    await this.userService.updateUserToken(
      user.id,
      credentials.deviceToken ?? '',
    )

    const accessTokenExpiryAt = getAccessTokenExpiry(
      parseInt(this.tokenExpiresIn),
    )

    await this.refreshTokenService.create({
      token: tokens.refreshToken,
      userId: user.id,
      expiresAt: tokens.expiresAt,
    })

    return {
      accessToken: tokens.accessToken,
      user: {
        ...user,
      },
      accessTokenExpiry: accessTokenExpiryAt,
      refreshToken: tokens.refreshToken,
    }
  }
}
