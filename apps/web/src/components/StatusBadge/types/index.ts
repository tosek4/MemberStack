export type StatusBadgeValue =
  | 'active'
  | 'inactive'
  | 'pending'
  | 'expired'
  | 'expiring'
  | 'suspended'
  | 'blocked'
  | 'noSubscription'

export interface StatusBadgeProps {
  value: StatusBadgeValue
  label?: string
}
