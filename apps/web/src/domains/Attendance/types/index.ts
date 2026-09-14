export type AttendanceStatus = 'checked-in' | 'checked-out'

export interface Attendance {
  id: string
  memberId: string
  memberName: string
  memberEmail: string

  memberSubscriptionId: string
  planName: string

  checkIn: string
  checkOut?: string

  status: AttendanceStatus
}

export type AttendanceStatusFilter = 'all' | AttendanceStatus

export interface AttendanceFiltersProps {
  search: string
  status: AttendanceStatusFilter
  date: string

  onSearchChange: (value: string) => void
  onStatusChange: (value: AttendanceStatusFilter) => void
  onDateChange: (value: string) => void
}

export interface AttendanceCardProps {
  attendance: Attendance

  onCheckOut?: (attendance: Attendance) => void
}

export interface CheckInFormData {
  memberId: string
  memberSubscriptionId: string
}

export interface CheckInProps {
  loading?: boolean

  onSubmit?: (data: CheckInFormData) => Promise<void> | void
}
export interface MockMember {
  id: string
  name: string
  email: string
}

export interface MockSubscription {
  id: string
  memberId: string
  planName: string
  validUntil: string
  status: 'active' | 'expiring' | 'expired'
}
