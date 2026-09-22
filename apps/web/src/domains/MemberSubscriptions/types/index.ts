export type SubscriptionStatusFilter = 'all' | SubscriptionStatus

export type SubscriptionStatus =
  | 'active'
  | 'inactive'
  | 'expired'
  | 'suspended'
  | 'blocked'

export interface SubscriptionMember {
  id: number
  firstName: string
  lastName: string
  email: string
  phone?: string | null
  birthDate: string
  gender?: string | null
  emergency_contact?: string | null
  profile_image?: string | null
  status: string
  createdByUserId: number
}

export interface SubscriptionMembershipPlan {
  id: number
  name: string
  description?: string | null
  price: number
  duration: number
  status: 'active' | 'inactive'
  createdAt: string
}

export interface MemberSubscription {
  id: number
  startedAt: string
  expiresAt: string
  status: SubscriptionStatus
  remainingVisits: number | null
  memberId: number
  membershipPlanId: number
  createdByUserId: number
  member: SubscriptionMember
  membershipPlan: SubscriptionMembershipPlan
}

export interface SubscriptionCardProps {
  subscription: MemberSubscription
  onView?: (subscription: MemberSubscription) => void
  onRenew?: (subscriptionId: number) => void
}

export interface SubscriptionFiltersProps {
  search: string
  status: SubscriptionStatusFilter
  onSearchChange: (value: string) => void
  onStatusChange: (value: SubscriptionStatusFilter) => void
}

export interface AddSubscriptionFormData {
  memberId: number
  membershipPlanId?: number
  planId: number
  startDate: string
  endDate: string
}

export interface AddSubscriptionProps {
  loading?: boolean
  onSubmit?: (data: AddSubscriptionFormData) => Promise<void> | void
}

export interface CreateSubscriptionPayload {
  startedAt: string
  expiresAt: string
  status: SubscriptionStatus
  remainingVisits?: number | null
  memberId: number
  membershipPlanId: number
}

export interface UpdateSubscriptionPayload {
  startedAt?: string
  expiresAt?: string
  status?: SubscriptionStatus
  remainingVisits?: number | null
  memberId?: number
  membershipPlanId?: number
}

export interface SubscriptionFilters {
  search?: string
  status?: SubscriptionStatusFilter
}
