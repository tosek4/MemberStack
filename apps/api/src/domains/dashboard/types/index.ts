export interface DashboardOverview {
  totalMembers: number
  activeMembers: number
  expiringMembers: number
  todayAttendance: number
  todayRevenue: number
  monthlyRevenue: number
}

export interface DashboardMemberActivityItem {
  date: string
  activeMembers: number
}

export interface DashboardAttendanceItem {
  date: string
  checkIns: number
}

export interface DashboardExpiringMember {
  id: number
  firstName: string
  lastName: string
  planName: string
  daysRemaining: number
}

export interface DashboardRecentPayment {
  id: number
  memberId: number
  firstName: string
  lastName: string
  planName: string
  amount: number
  date: string
}

export type DashboardPeriod = '7d' | '30d' | '3m' | '1y'

export interface DashboardMemberActivityItem {
  date: string
  newMembers: number
  activeMembers: number
  expiredMembers: number
}
