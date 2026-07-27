import { BindingKey } from '@loopback/core'
import { PasswordHasherService } from './password-hasher.service'
import { JwtService } from './jwt.service'
import { AuthService } from './auth.service'

export namespace AuthBindings {
  export const PASSWORD_HASHER =
    BindingKey.create<PasswordHasherService>('services.PasswordHasher')

  export const JWT_SERVICE = BindingKey.create<JwtService>('services.JwtService')

  export const AUTH_SERVICE =
    BindingKey.create<AuthService>('services.AuthService')

  export const TOKEN_SECRET = BindingKey.create<string>('authentication.jwt.secret')

  export const TOKEN_EXPIRES_IN = BindingKey.create<string>(
    'authentication.jwt.expiresIn',
  )

  export const REFRESH_SECRET = BindingKey.create<string>(
    'authentication.jwt.refreshSecret',
  )

  export const REFRESH_EXPIRES_DAYS = BindingKey.create<number>(
    'authentication.jwt.refreshExpiresDays',
  )

  export const CURRENT_USER = BindingKey.create<object | undefined>(
    'authentication.currentUser',
  )
}
