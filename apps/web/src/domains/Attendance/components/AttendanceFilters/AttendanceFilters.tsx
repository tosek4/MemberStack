import React from 'react'
import { Search } from 'lucide-react'

import type {
  AttendanceFiltersProps,
  AttendanceStatusFilter,
} from '../../types'

import { ATTENDANCE_STATUS_LABELS } from '../../utils/labels'

import { styles } from './AttendanceFilters.styled'

export const AttendanceFilters: React.FC<AttendanceFiltersProps> = ({
  search,
  status,
  date,
  onSearchChange,
  onStatusChange,
  onDateChange,
  onToday,
  onYesterday,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.search.wrapper}>
        <Search size={18} className={styles.search.icon} />

        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by member name or email..."
          className={styles.search.input}
        />
      </div>

      <div className={styles.filters}>
        <button type="button" onClick={onToday} className={styles.dateButton}>
          Today
        </button>

        <button
          type="button"
          onClick={onYesterday}
          className={styles.dateButton}
        >
          Yesterday
        </button>
        <select
          value={status}
          onChange={(event) =>
            onStatusChange(event.target.value as AttendanceStatusFilter)
          }
          className={styles.select}
        >
          <option value="all">All Statuses</option>

          {Object.entries(ATTENDANCE_STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(event) => onDateChange(event.target.value)}
          className={styles.date}
        />
      </div>
    </div>
  )
}
