import { Provider, inject } from '@loopback/core'
import {
  Authorizer,
  AuthorizationDecision,
  AuthorizationContext,
} from '@loopback/authorization'
import { UserProfile } from '../../user/types/user-profile'
import { RestBindings, Request } from '@loopback/rest'

export class RoleAuthorizerProvider implements Provider<Authorizer> {
  private request: Request | undefined

  constructor(
    @inject(RestBindings.Http.REQUEST, { optional: true })
    request?: Request,
  ) {
    this.request = request
  }

  value(): Authorizer {
    return this.authorize.bind(this)
  }

  async authorize(
    context: AuthorizationContext,
    metadata: any,
  ): Promise<AuthorizationDecision> {
    let user = context.principals[0] as UserProfile

    if (!user?.role && this.request) {
      const token = this.extractToken(this.request)

      if (token) {
        try {
          const base64Url = token.split('.')[1]
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')

          const jsonPayload = Buffer.from(base64, 'base64').toString()

          const decoded = JSON.parse(jsonPayload)

          if (decoded?.role) {
            user = {
              ...user,
              role: decoded.role,
            }
          }
        } catch (err) {
          console.error('Error decoding token:', err)
        }
      }
    }

    if (!user) {
      return AuthorizationDecision.DENY
    }

    if (!metadata.allowedRoles?.length) {
      return AuthorizationDecision.ALLOW
    }

    const hasRole = user?.role && metadata.allowedRoles.includes(user.role)

    return hasRole ? AuthorizationDecision.ALLOW : AuthorizationDecision.DENY
  }

  private extractToken(request: Request): string | undefined {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      return undefined
    }

    const parts = authHeader.split(' ')

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return undefined
    }

    return parts[1]
  }
}
