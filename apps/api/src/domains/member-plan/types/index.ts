import { MemberSubscriptionWithRelations } from '../../member-subscription/models'

export interface MemberPlanRelations {
  subscriptions?: MemberSubscriptionWithRelations[]
}
export enum MemberPlanStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
