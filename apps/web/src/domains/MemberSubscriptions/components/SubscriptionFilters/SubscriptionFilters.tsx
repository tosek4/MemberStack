import React from 'react'
import { Search } from 'lucide-react'

import { SubscriptionFiltersProps, SubscriptionStatusFilter } from '../../types'
import { LABELS } from '../../utils/labels'

import { styles } from './SubscriptionFilters.styled'

const statusOptions: {
  value: SubscriptionStatusFilter
  label: string
}[] = [
  { value: 'all', label: LABELS.all },
  { value: 'active', label: LABELS.active },
  { value: 'inactive', label: LABELS.inactive },
  { value: 'expired', label: LABELS.expired },
  { value: 'suspended', label: LABELS.suspended },
  { value: 'blocked', label: LABELS.blocked },
]

export const SubscriptionFilters: React.FC<SubscriptionFiltersProps> = ({
  search,
  status,
  onSearchChange,
  onStatusChange,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.search.wrapper}>
        <Search size={18} className={styles.search.icon} />

        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={LABELS.searchPlaceholder}
          className={styles.search.input}
        />
      </div>

      <div className={styles.status.wrapper}>
        {statusOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`${styles.status.button} ${
              status === option.value
                ? styles.status.active
                : styles.status.inactive
            }`}
            onClick={() => onStatusChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
