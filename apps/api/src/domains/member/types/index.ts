import { AttendanceWithRelations } from '../../attendance/models'
import { MemberPlan } from '../../member-plan/models'
import {
  MemberSubscription,
  MemberSubscriptionWithRelations,
} from '../../member-subscription/models'
import { PaymentWithRelations } from '../../payment/models'
import { UserWithRelations } from '../../user/models'
import { Member } from '../models'

export interface MemberRelations {
  createdBy?: UserWithRelations
  attendances?: AttendanceWithRelations[]
  payments?: PaymentWithRelations[]
  subscriptions?: MemberSubscriptionWithRelations[]
}

export type ActiveSubscription = MemberSubscription & {
  membershipPlan?: MemberPlan
}

export type MemberListItem = Omit<Member, keyof Member> & {
  id?: number
  firstName: string
  lastName: string
  email: string
  phone?: string
  birthDate: Date
  gender?: string
  emergency_contact?: string
  profile_image?: string
  status: string
  createdByUserId: number
  activeSubscription: ActiveSubscription | null
}
