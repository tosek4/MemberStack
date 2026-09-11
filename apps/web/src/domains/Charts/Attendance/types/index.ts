export interface AttendanceDay {
  date: string
  checkIns: number
}

export interface AttendanceProps {
  month: string
  days: AttendanceDay[]
}
