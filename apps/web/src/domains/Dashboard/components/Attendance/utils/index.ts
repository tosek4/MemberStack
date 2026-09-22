import { styles } from '../Attendance.styled'

export const getIntensityClass = (checkIns: number) => {
  if (checkIns === 0) {
    return styles.day.empty
  }

  if (checkIns <= 20) {
    return styles.day.low
  }

  if (checkIns <= 50) {
    return styles.day.medium
  }

  if (checkIns <= 100) {
    return styles.day.high
  }

  return styles.day.veryHigh
}

export const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
