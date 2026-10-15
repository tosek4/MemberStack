export interface heroProps {
  gymName?: string
}

export interface mobileAppProps {
  gymName?: string
}

export interface membershipPlansProps {
  currency?: string
}

export interface footerProps {
  gymName?: string
  email?: string
  phone?: string
  address?: string
}

export interface PublicSettings {
  gymName: string
  email: string
  phone: string
  address: string
  currency: string
}

export type MembershipPlanStatus = 'active' | 'inactive'

export interface PublicMembershipPlan {
  name: string
  price: number
  currency: string
  duration: number
  description?: string
  status: MembershipPlanStatus
  activeMembers: number
  isDailyPlan: boolean
}
