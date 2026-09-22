export interface DashboardOverview {
  totalMembers: number
  activeMembers: number
  expiringMembers: number
  todayAttendance: number
  todayRevenue: number
  monthlyRevenue: number
}

export interface DashboardMemberActivity {
  date: string
  activeMembers: number
  newMembers: number
  expiredMembers: number
}

export interface DashboardAttendance {
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
  amount: string
  date: string
}
