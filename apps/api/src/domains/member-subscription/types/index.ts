import { MemberPlanWithRelations } from '../../member-plan/models'
import { MemberWithRelations } from '../../member/models'
import { PaymentWithRelations } from '../../payment/models'
import { UserWithRelations } from '../../user/models'

export interface MemberSubscriptionRelations {
  member?: MemberWithRelations
  membershipPlan?: MemberPlanWithRelations
  createdBy?: UserWithRelations
  payments?: PaymentWithRelations[]
}
export type MemberSubscriptionStatus =
  | 'active'
  | 'inactive'
  | 'expired'
  | 'suspended'
  | 'blocked'
export interface MemberSubscriptionFilters {
  search?: string
  status?: MemberSubscriptionStatus
}
