import React from 'react'

import { LABELS } from '../../utils/labels'
import { UserCardProps } from './types'
import { styles } from './UserCard.styled'
import { getInitials } from '@/utils/textTransform'
import { StatusBadge } from '@/components/StatusBadge/StatusBadge'

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onEdit,
  onToggleStatus,
}) => {
  const status = user.isActive ? 'active' : 'inactive'
  return (
    <div className={styles.card.root}>
      <div className={styles.card.header}>
        <div className={styles.card.user.wrapper}>
          <div className={styles.card.user.avatar}>
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.firstName}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              getInitials(user.firstName + ' ' + user.lastName)
            )}
          </div>

          <div className={styles.card.user.info.wrapper}>
            <p className={styles.card.user.info.name}>
              {user.firstName} {user.lastName}
            </p>

            <p className={styles.card.user.info.email}>{user.email}</p>
          </div>
        </div>

        <StatusBadge value={status} />
      </div>

      <span
        className={`${styles.role.base} ${styles.role[user.role?.name as keyof typeof styles.role]}`}
      >
        {user.role?.name
          ? LABELS.roles[user.role.name as keyof typeof LABELS.roles]
          : 'Unknown role'}
      </span>

      <div className={styles.details.wrapper}>
        <div>
          <p className={styles.details.item.label}>Phone</p>

          <p className={styles.details.item.value}>
            {user.phone || 'Not provided'}
          </p>
        </div>

        <div>
          <p className={styles.details.item.label}>{LABELS.lastLogin}</p>

          <p className={styles.details.item.value}>
            {user.lastLogin || 'Never'}
          </p>
        </div>
      </div>

      <div className={styles.actions.wrapper}>
        <button
          type="button"
          className={`${styles.actions.button} ${styles.actions.edit}`}
          onClick={() => onEdit?.(user)}
        >
          {LABELS.edit}
        </button>

        <button
          type="button"
          className={`${styles.actions.button} ${
            user.isActive ? styles.actions.deactivate : styles.actions.activate
          }`}
          onClick={() =>
            onToggleStatus?.({
              id: user.id,
              isActive: !user.isActive,
            })
          }
        >
          {user.isActive ? LABELS.deactivate : LABELS.activate}
        </button>
      </div>
    </div>
  )
}
