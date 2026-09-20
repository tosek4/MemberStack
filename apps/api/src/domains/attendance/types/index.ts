import { MemberWithRelations } from '../../member/models'
import { UserWithRelations } from '../../user/models'

export interface AttendanceRelations {
  member?: MemberWithRelations
  createdBy?: UserWithRelations
}

export interface AttendanceListItem {
  id: number
  memberId: number
  memberName: string
  memberEmail: string
  memberSubscriptionId: number | null
  planName: string | null
  checkIn: Date
  checkOut: Date | null
  status: 'checked-in' | 'checked-out'
}

export interface AttendanceStats {
  date: string
  totalVisits: number
  currentlyInGym: number
  checkIns: number
  checkOuts: number
}

export type AttendanceListStatus = 'all' | 'checked-in' | 'checked-out'

export interface AttendanceListFilters {
  search?: string
  status?: AttendanceListStatus
  date?: string
}
