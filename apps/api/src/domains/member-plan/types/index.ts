import { MemberSubscriptionWithRelations } from '../../member-subscription/models'

export interface MemberPlanRelations {
  subscriptions?: MemberSubscriptionWithRelations[]
}
