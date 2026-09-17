import { BindingKey } from '@loopback/core'
import { MemberSubscriptionService } from './service'

export const MEMBER_SUBSCRIPTION_SERVICE =
  BindingKey.create<MemberSubscriptionService>('service.member-subscription')
