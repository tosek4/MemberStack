export type MembershipPlanStatus = 'active' | 'inactive'

export interface MembershipPlan {
  id: string
  name: string
  price: number
  currency: string
  durationDays: number
  description?: string
  status: MembershipPlanStatus
  activeMembers: number
}

export interface MembershipPlanCardProps {
  plan: MembershipPlan
  onEdit?: (plan: MembershipPlan) => void
  onDelete?: (plan: MembershipPlan) => void
}