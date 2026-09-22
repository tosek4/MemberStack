export interface MemberActivityData {
  date: string
  newMembers: number
  activeMembers: number
  expiredMembers: number
}

export interface MemberActivityProps {
  data?: MemberActivityData[]
  period: string
  onPeriodChange: (value: string) => void
}
