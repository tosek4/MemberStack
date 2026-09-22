import React from 'react'

import { styles } from './Attendance.styled'
import { getIntensityClass, weekDays } from './utils'
import { AttendanceProps } from './types'

export const Attendance: React.FC<AttendanceProps> = ({ data }) => {
  const firstDay = data[0]?.date
  const startingDay = firstDay ? new Date(`${firstDay}T00:00:00`).getDay() : 1

  const emptyDays = startingDay === 0 ? 6 : startingDay - 1

  const calendarDays = [
    ...Array.from({ length: emptyDays }, () => null),
    ...data,
  ]

  const totalCheckIns = data.reduce((total, day) => total + day.checkIns, 0)

  const month = firstDay
    ? new Date(`${firstDay}T00:00:00`).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : ''

  return (
    <section className={styles.root}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>Attendance</h2>

          <p className={styles.subtitle}>{month}</p>
        </div>

        <div className={styles.total}>
          <div className={styles.totalValue}>
            {totalCheckIns.toLocaleString()}
          </div>

          <div className={styles.totalLabel}>check-ins</div>
        </div>
      </div>

      <div className={styles.calendar}>
        <div className={styles.weekdays}>
          {weekDays.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>

        <div className={styles.grid}>
          {calendarDays.map((day, index) => {
            if (!day) {
              return (
                <div
                  key={`empty-${index}`}
                  className={`${styles.day.root} ${styles.day.empty}`}
                />
              )
            }

            return (
              <div
                key={day.date}
                className={`${styles.day.root} ${getIntensityClass(
                  day.checkIns,
                )}`}
                title={`${day.date}: ${day.checkIns} check-ins`}
              >
                {day.checkIns}
              </div>
            )
          })}
        </div>
      </div>

      <div className={styles.legend}>
        <span>Less</span>

        <span className={styles.legendItems}>
          <span className={`${styles.legendSquare} ${styles.day.low}`} />

          <span className={`${styles.legendSquare} ${styles.day.medium}`} />

          <span className={`${styles.legendSquare} ${styles.day.high}`} />

          <span className={`${styles.legendSquare} ${styles.day.veryHigh}`} />
        </span>

        <span>More</span>
      </div>
    </section>
  )
}
