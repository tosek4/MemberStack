'use client'

import React from 'react'

import { styles } from './Attendance.styled'
import { AttendanceProps } from './types'
import { LABELS } from './utils/labels'

const getIntensityClass = (checkIns: number) => {
  if (checkIns === 0) {
    return styles.card.day.low
  }

  if (checkIns <= 20) {
    return styles.card.day.low
  }

  if (checkIns <= 50) {
    return styles.card.day.medium
  }

  if (checkIns <= 80) {
    return styles.card.day.high
  }

  return styles.card.day.veryHigh
}

export const Attendance: React.FC<AttendanceProps> = ({ month, days }) => {
  const weekdays = [
    LABELS.mon,
    LABELS.tue,
    LABELS.wed,
    LABELS.thu,
    LABELS.fri,
    LABELS.sat,
    LABELS.sun,
  ]

  return (
    <div className={styles.card.root}>
      <h2 className={styles.card.title}>{month}</h2>

      <div className={styles.card.calendar}>
        <div className={styles.card.weekdays}>
          {weekdays.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>

        <div className={styles.card.grid}>
          {days.map((day) => (
            <div
              key={day.date}
              className={`${styles.card.day.root} ${getIntensityClass(
                day.checkIns,
              )}`}
              title={`${day.date}: ${day.checkIns} check-ins`}
            >
              {new Date(day.date).getDate()}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.card.legend}>
        <span>{LABELS.less}</span>

        <div className={styles.card.legendItems}>
          <span
            className={`${styles.card.legendSquare} ${styles.card.day.low}`}
          />
          <span
            className={`${styles.card.legendSquare} ${styles.card.day.medium}`}
          />
          <span
            className={`${styles.card.legendSquare} ${styles.card.day.high}`}
          />
          <span
            className={`${styles.card.legendSquare} ${styles.card.day.veryHigh}`}
          />
        </div>

        <span>{LABELS.more}</span>
      </div>
    </div>
  )
}
