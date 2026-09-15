import React from 'react'

import { LABELS } from '../../utils/labels'
import { UserRole, UserStatus } from '../../types'
import { UserFiltersProps } from './types'
import { styles } from './UserFilters.styled'

export const UserFilters: React.FC<UserFiltersProps> = ({
  filters,
  onChange,
}) => {
  return (
    <div className={styles.root}>
      <input
        type="text"
        value={filters.search}
        placeholder={LABELS.searchPlaceholder}
        className={styles.search}
        onChange={(e) =>
          onChange({
            ...filters,
            search: e.target.value,
          })
        }
      />

      <select
        value={filters.role}
        className={styles.select}
        onChange={(e) =>
          onChange({
            ...filters,
            role: e.target.value as UserRole | 'all',
          })
        }
      >
        <option value="all">{LABELS.allRoles}</option>
        <option value="super_admin">{LABELS.roles.super_admin}</option>
        <option value="admin">{LABELS.roles.admin}</option>
        <option value="receptionist">{LABELS.roles.receptionist}</option>
        <option value="trainer">{LABELS.roles.trainer}</option>
      </select>

      <select
        value={filters.status}
        className={styles.select}
        onChange={(e) =>
          onChange({
            ...filters,
            status: e.target.value as UserStatus | 'all',
          })
        }
      >
        <option value="all">{LABELS.allStatuses}</option>
        <option value="active">{LABELS.statuses.active}</option>
        <option value="inactive">{LABELS.statuses.inactive}</option>
      </select>
    </div>
  )
}
