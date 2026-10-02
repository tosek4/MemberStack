import { BindingKey } from '@loopback/core'
import { MemberSubscriptionService } from './services'
import { SubscriptionExpirationService } from './services/subscription-expiration.service'

export const MEMBER_SUBSCRIPTION_SERVICE =
  BindingKey.create<MemberSubscriptionService>('service.member-subscription')

export const MEMBER_SUBSCRIPTION_EXPIRATION_SERVICE =
  BindingKey.create<SubscriptionExpirationService>(
    'service.subscription-expiration',
  )
