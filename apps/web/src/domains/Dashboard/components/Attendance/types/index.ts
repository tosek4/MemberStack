export interface AttendanceDay {
  date: string
  checkIns: number
}

export interface AttendanceProps {
  data: AttendanceDay[]
}