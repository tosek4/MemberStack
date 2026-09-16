export type MemberStatus = 'active' | 'expiring' | 'expired' | 'no-subscription'

export type MemberStatusFilter = 'all' | MemberStatus

export interface MemberSubscription {
  id: number
  startedAt: string
  expiresAt: string
  status: string
  remainingVisits: number | null
  memberId: number
  membershipPlanId: number
  membershipPlan?: {
    id: number
    name: string
    description?: string
  }
}

export interface Member {
  id: number
  firstName: string
  lastName: string
  email: string
  phone?: string | null
  birthDate?: string | null
  gender?: string
  emergency_contact?: string | null
  profile_image?: string | null
  status: string
  activeSubscription: MemberSubscription | null
}

export interface CreateMemberPayload {
  firstName: string
  lastName: string
  email: string
  phone?: string
  birthDate: string
  gender?: string
  status: 'active'
}

export interface UpdateMemberData {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  isActive?: boolean
}

export interface MemberCardProps {
  member: Member
  onView?: (member: Member) => void
}

export interface MemberFiltersProps {
  search: string
  status: MemberStatusFilter
  onSearchChange: (value: string) => void
  onStatusChange: (value: MemberStatusFilter) => void
}
