import { MemberSubscriptionWithRelations } from '../../member-subscription/models'
import { MemberWithRelations } from '../../member/models'
import { UserWithRelations } from '../../user/models'

export interface PaymentRelations {
  member?: MemberWithRelations
  memberSubscription?: MemberSubscriptionWithRelations
  createdBy?: UserWithRelations
}

export type PaymentMethod = 'cash' | 'card' | 'bank-transfer'

export type PaymentStatus = 'paid' | 'pending' | 'failed' | 'refunded'

export interface PaymentListItem {
  id: number
  memberId: number
  memberName: string
  memberEmail: string
  memberSubscriptionId: number
  planName: string
  amount: number
  currency: string
  method: string
  status: string
  paymentDate: Date
  reference?: string
}
