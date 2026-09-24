import { PaymentMethod } from '@/components/PaymentMethodModal/types'

export type AttendanceStatus = 'checked-in' | 'checked-out'

export interface Attendance {
  id: number
  memberId: number
  memberName: string
  memberEmail: string
  memberSubscriptionId: number | null
  planName: string | null
  checkIn: string
  checkOut: string | null
  status: AttendanceStatus
}

export type AttendanceStatusFilter = 'all' | AttendanceStatus

export interface AttendanceFilters {
  search?: string
  status?: AttendanceStatusFilter
  date?: string
}

export interface AttendanceFiltersProps {
  search: string
  status: AttendanceStatusFilter
  date: string

  onSearchChange: (value: string) => void
  onStatusChange: (value: AttendanceStatusFilter) => void
  onDateChange: (value: string) => void
  onToday: () => void
  onYesterday: () => void
}

export interface AttendanceCardProps {
  attendance: Attendance

  onCheckOut?: (id: number) => void
}

export interface CheckInFormData {
  memberId: number
}

export interface CheckInProps {
  open: boolean
  loading?: boolean
  onClose: () => void
  onSubmit: (data: CheckInFormData) => Promise<void> | void
}

export interface AttendanceStats {
  date: string
  totalVisits: number
  currentlyInGym: number
  checkIns: number
  checkOuts: number
}

export interface CreateAttendancePayload {
  memberId: number
  checkedInAt: string
  attendanceMethod: 'qr' | 'nfc' | 'manual'
  status: AttendanceStatus
}

export interface UpdateAttendancePayload {
  checkedInAt?: string
  checkedOutAt?: string | null
  attendanceMethod?: 'qr' | 'nfc' | 'manual'
  status?: AttendanceStatus
}

export interface CreateDailyCheckInPayload {
  firstName: string
  lastName: string
  phone: string
  membershipPlanId: number
  paymentMethod: PaymentMethod
}
