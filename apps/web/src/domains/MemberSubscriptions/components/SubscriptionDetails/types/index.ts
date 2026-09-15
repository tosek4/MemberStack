import { MemberSubscription } from '../../../types'

export interface SubscriptionDetailsProps {
  subscription: MemberSubscription
  onBack?: () => void
  onRenew?: () => void
}
