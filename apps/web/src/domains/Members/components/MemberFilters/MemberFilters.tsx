import React from 'react'
import { Search } from 'lucide-react'
import { MemberFiltersProps } from '../../types'
import { styles } from './MemberFilters.styled'
import { statusOptions } from './utils'

export const MemberFilters: React.FC<MemberFiltersProps> = ({
  search,
  status,
  onSearchChange,
  onStatusChange,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.search.wrapper}>
        <Search className={styles.search.icon} size={18} />

        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search members..."
          className={styles.search.input}
        />
      </div>

      <div className={styles.status.wrapper}>
        {statusOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onStatusChange(option.value)}
            className={`${styles.status.button} ${
              status === option.value
                ? styles.status.active
                : styles.status.inactive
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
