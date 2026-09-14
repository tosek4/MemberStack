import type { AttendanceStatus } from '../types'

export const LABELS = {
  title: 'Attendance',
  description: 'Track member check-ins and check-outs.',

  checkIn: 'Check In',
  checkOut: 'Check Out',

  searchPlaceholder: 'Search by member name or email...',

  allStatuses: 'All Statuses',
  checkedIn: 'Checked In',
  checkedOut: 'Checked Out',

  today: 'Today',
  currentlyInGym: 'Currently In Gym',
  totalVisits: 'Total Visits',
  checkedOutToday: 'Checked Out',

  member: 'Member',
  membership: 'Membership',
  checkInTime: 'Check In',
  checkOutTime: 'Check Out',
  status: 'Status',

  noAttendance: 'No attendance found',
  noAttendanceDescription: 'Try changing your search or filters.',
} as const

export const ATTENDANCE_STATUS_LABELS: Record<AttendanceStatus, string> = {
  'checked-in': LABELS.checkedIn,
  'checked-out': LABELS.checkedOut,
}
