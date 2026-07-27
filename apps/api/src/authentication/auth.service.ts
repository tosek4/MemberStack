import { BindingScope, inject, injectable } from '@loopback/core'
import { repository } from '@loopback/repository'
import { HttpErrors } from '@loopback/rest'
import { randomUUID } from 'crypto'
import { EConfigKeys } from '../config'
import { UserRepository } from '../domains/user/repositories'
import { RefreshTokenRepository } from '../domains/refresh-token/repositories'
import {
  AuthResult,
  Credentials,
  CreateUserDto,
  TokenPair,
} from '../domains/user/types'
import { User } from '../domains/user/models'
import { AuthBindings } from './keys'
import { JwtService } from './jwt.service'
import { PasswordHasherService } from './password-hasher.service'

@injectable({ scope: BindingScope.TRANSIENT })
export class AuthService {
  constructor(
    @repository(UserRepository)
    private userRepository: UserRepository,
    @repository(RefreshTokenRepository)
    private refreshTokenRepository: RefreshTokenRepository,
    @inject(AuthBindings.JWT_SERVICE)
    private jwtService: JwtService,
    @inject(AuthBindings.PASSWORD_HASHER)
    private passwordHasher: PasswordHasherService,
  ) {}

  async register(data: CreateUserDto): Promise<User> {
    const existing = await this.userRepository.findOne({
      where: { email: data.email },
    })
    if (existing) {
      throw new HttpErrors.Conflict('Email already registered')
    }

    const passwordHash = await this.passwordHasher.hashPassword(data.password)

    return this.userRepository.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      passwordHash,
      phone: data.phone,
      isActive: data.isActive ?? true,
      roleId: data.roleId,
    })
  }

  async login(credentials: Credentials): Promise<AuthResult> {
    const user = await this.userRepository.findOne({
      where: { email: credentials.email },
    })

    if (!user) {
      throw new HttpErrors.Unauthorized('Invalid email or password')
    }

    if (!user.isActive) {
      throw new HttpErrors.Unauthorized('Account is inactive')
    }

    const valid = await this.passwordHasher.comparePassword(
      credentials.password,
      user.passwordHash,
    )

    if (!valid) {
      throw new HttpErrors.Unauthorized('Invalid email or password')
    }

    const tokens = await this.issueTokens(user)

    return {
      ...tokens,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        isActive: user.isActive,
        roleId: user.roleId,
      },
    }
  }

  async refresh(refreshToken: string): Promise<TokenPair> {
    const payload = this.jwtService.verifyRefreshToken(refreshToken)

    const stored = await this.refreshTokenRepository.findById(payload.tokenId)

    if (!stored || stored.token !== refreshToken) {
      throw new HttpErrors.Unauthorized('Invalid refresh token')
    }

    if (stored.revokedAt) {
      throw new HttpErrors.Unauthorized('Refresh token has been revoked')
    }

    if (new Date(stored.expiresAt).getTime() < Date.now()) {
      throw new HttpErrors.Unauthorized('Refresh token has expired')
    }

    const user = await this.userRepository.findById(payload.sub)
    if (!user || !user.isActive) {
      throw new HttpErrors.Unauthorized('User not found or inactive')
    }

    // Rotate: revoke old token, issue new pair
    await this.refreshTokenRepository.updateById(stored.id, {
      revokedAt: new Date().toISOString(),
    })

    return this.issueTokens(user)
  }

  async logout(refreshToken: string): Promise<void> {
    let tokenId: number | undefined

    try {
      const payload = this.jwtService.verifyRefreshToken(refreshToken)
      tokenId = payload.tokenId
    } catch {
      // Still try to find by raw token value
    }

    const stored = tokenId
      ? await this.refreshTokenRepository.findOne({ where: { id: tokenId } })
      : await this.refreshTokenRepository.findOne({
          where: { token: refreshToken },
        })

    if (stored && !stored.revokedAt) {
      await this.refreshTokenRepository.updateById(stored.id, {
        revokedAt: new Date().toISOString(),
      })
    }
  }

  async logoutAll(userId: number): Promise<void> {
    const tokens = await this.refreshTokenRepository.find({
      where: { userId },
    })

    const active = tokens.filter(token => !token.revokedAt)
    await Promise.all(
      active.map(token =>
        this.refreshTokenRepository.updateById(token.id, {
          revokedAt: new Date().toISOString(),
        }),
      ),
    )
  }

  private async issueTokens(user: User): Promise<TokenPair> {
    if (!user.id) {
      throw new HttpErrors.InternalServerError('User id is missing')
    }

    const accessToken = this.jwtService.generateAccessToken({
      sub: user.id,
      email: user.email,
      roleId: user.roleId,
    })

    const expiresAt = new Date()
    expiresAt.setDate(
      expiresAt.getDate() + EConfigKeys.jwtRefreshExpiresDays,
    )

    // Placeholder token so we get a DB id, then replace with signed JWT
    const placeholder = await this.refreshTokenRepository.create({
      userId: user.id,
      token: randomUUID(),
      expiresAt: expiresAt.toISOString(),
    })

    const refreshToken = this.jwtService.generateRefreshToken(
      { sub: user.id, tokenId: placeholder.id! },
      `${EConfigKeys.jwtRefreshExpiresDays}d`,
    )

    await this.refreshTokenRepository.updateById(placeholder.id, {
      token: refreshToken,
    })

    return {
      accessToken,
      refreshToken,
      expiresIn: EConfigKeys.jwtAccessExpiresIn,
    }
  }
}
