import { BindingKey } from '@loopback/core'
import { MemberAuthService } from './service'

export const MEMBER_AUTH_SERVICE = BindingKey.create<MemberAuthService>(
  'service.member-auth',
)
