import React from 'react'
import { styles } from './DashboardHeader.styled'
import { formatDate, getCurrentDate } from '@/utils/dateFormat'

export const DashboardHeader: React.FC = () => {
  const currentDate = getCurrentDate()
  return (
    <header className={styles.root}>
      <div>
        <div className={styles.eyebrow}>
          <span className={styles.statusDot} />
          Dashboard
        </div>

        <p className={styles.subtitle}>
          Here&apos;s what&apos;s happening in your gym today.
        </p>
      </div>

      <div>{formatDate(currentDate)}</div>
    </header>
  )
}
