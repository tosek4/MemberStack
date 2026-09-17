export type MembershipPlanStatus = 'active' | 'inactive'

export interface MembershipPlan {
  id: number
  name: string
  price: number
  currency: string
  duration: number
  description?: string
  status: MembershipPlanStatus
  activeMembers: number
}

export interface MembershipPlanCardProps {
  plan: MembershipPlan
  onEdit?: (plan: MembershipPlan) => void
  onDelete?: (planId: number) => void
  openDeleteModal?: () => void
}

export interface CreateMembershipPlanPayload {
  name: string
  description?: string
  price: number
  duration: number
  status: MembershipPlanStatus
}

export interface UpdateMembershipPlanData {
  name?: string
  description?: string
  price?: number
  duration?: number
  status?: MembershipPlanStatus
}
