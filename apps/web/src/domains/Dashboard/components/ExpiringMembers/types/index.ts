export interface ExpiringMember {
  id: number
  firstName: string
  lastName: string
  planName: string
  daysRemaining: number
}

export interface ExpiringMembersProps {
  members?: ExpiringMember[]
}
