export type SubscriptionStatus = 'active' | 'expiring' | 'expired'

export type SubscriptionStatusFilter = 'all' | SubscriptionStatus

export interface MemberSubscription {
  id: string
  memberId: string
  memberName: string
  memberEmail: string
  planName: string
  price: number
  currency: string
  startDate: string
  endDate: string
  status: SubscriptionStatus
}

export interface SubscriptionCardProps {
  subscription: MemberSubscription
  onView?: (subscription: MemberSubscription) => void
  onRenew?: (subscription: MemberSubscription) => void
}

export interface SubscriptionFiltersProps {
  search: string
  status: SubscriptionStatusFilter
  onSearchChange: (value: string) => void
  onStatusChange: (value: SubscriptionStatusFilter) => void
}

export interface AddSubscriptionFormData {
  memberId: string
  planId: string
  startDate: string
  endDate: string
}

export interface AddSubscriptionProps {
  loading?: boolean
  onSubmit?: (data: AddSubscriptionFormData) => Promise<void> | void
}
