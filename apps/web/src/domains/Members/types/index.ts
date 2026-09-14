export type MemberStatus = 'active' | 'expiring' | 'expired' | 'no-subscription'

export type MemberStatusFilter = 'all' | MemberStatus

export interface Member {
  id: string
  name: string
  email: string
  phone?: string
  photoUrl?: string
  plan?: string
  startDate?: string
  endDate?: string
  status: MemberStatus
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
