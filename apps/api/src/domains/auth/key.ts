import { BindingKey } from '@loopback/core'
import { RolesService } from './services/role.service'
import { JwtService } from './services/jwt.service'
import { AuthService } from './services/auth.service'
import { PasswordHasherService } from './services/password-hasher.service'

export const AUTH_SERVICE = BindingKey.create<AuthService>('service.auth')
export const ROLES_SERVICE = BindingKey.create<RolesService>('service.roles')
export const JWT_SERVICE = BindingKey.create<JwtService>('service.jwt')
export const RESOURCE_ID = BindingKey.create<string>('resourceId')
export const PASSWORD_HASHER =
  BindingKey.create<PasswordHasherService>('password.hasher')
export const SANITIZE_EMAIL_INTERCEPTOR = BindingKey.create(
  'sanitize_email_interceptor',
)


export const JWT_SECRET = BindingKey.create<string>('authentication.jwt.secret')
export const JWT_EXPIRES_IN = BindingKey.create<string>('authentication.jwt.expiresIn')
