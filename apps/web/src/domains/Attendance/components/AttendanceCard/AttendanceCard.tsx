import React from 'react'

import type { AttendanceCardProps } from '../../types'

import { ATTENDANCE_STATUS_LABELS } from '../../utils/labels'

import { styles } from './AttendanceCard.styled'

export const AttendanceCard: React.FC<AttendanceCardProps> = ({
  attendance,
  onCheckOut,
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  }

  const formatTime = (date: string) => {
    return new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date))
  }

  const statusClass =
    attendance.status === 'checked-in'
      ? styles.badge.checkedIn
      : styles.badge.checkedOut

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.member.wrapper}>
          <div className={styles.member.avatar}>
            {getInitials(attendance.memberName)}
          </div>

          <div className={styles.member.info}>
            <p className={styles.member.name}>{attendance.memberName}</p>

            <p className={styles.member.email}>{attendance.memberEmail}</p>
          </div>
        </div>

        <span className={`${styles.badge.base} ${statusClass}`}>
          {ATTENDANCE_STATUS_LABELS[attendance.status]}
        </span>
      </div>

      <div className={styles.divider} />

      <div className={styles.details}>
        <div>
          <p className={styles.detail.label}>Membership</p>

          <p className={styles.detail.value}>{attendance.planName}</p>
        </div>

        <div>
          <p className={styles.detail.label}>Check In</p>

          <p className={styles.detail.value}>
            {formatTime(attendance.checkIn)}
          </p>
        </div>

        <div>
          <p className={styles.detail.label}>Check Out</p>

          <p className={styles.detail.value}>
            {attendance.checkOut ? formatTime(attendance.checkOut) : '—'}
          </p>
        </div>
      </div>

      {attendance.status === 'checked-in' && onCheckOut && (
        <div className={styles.footer}>
          <span />

          <button
            type="button"
            className={styles.action}
            onClick={() => onCheckOut(attendance)}
          >
            Check Out
          </button>
        </div>
      )}
    </div>
  )
}
