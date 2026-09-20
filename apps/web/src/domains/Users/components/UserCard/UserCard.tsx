import React from 'react'

import { LABELS } from '../../utils/labels'
import { UserCardProps } from './types'
import { styles } from './UserCard.styled'

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()

const getRoleStyle = (role: UserCardProps['user']['role']) => {
  switch (role) {
    case 'super_admin':
      return styles.role.superAdmin

    case 'admin':
      return styles.role.admin

    case 'receptionist':
      return styles.role.receptionist

    case 'trainer':
      return styles.role.trainer
  }
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onEdit,
  onToggleStatus,
}) => {
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

        <span
          className={`${styles.card.status.base} ${
            user.isActive === true
              ? styles.card.status.active
              : styles.card.status.inactive
          }`}
        >
          {LABELS.statuses[user.isActive === true ? 'active' : 'inactive']}
        </span>
      </div>

      <span className={`${styles.role.base} ${getRoleStyle(user.role)}`}>
        {LABELS.roles[user.role]}
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
          className={`${styles.actions.button} ${styles.actions.toggle}`}
          onClick={() =>
            onToggleStatus?.({ id: user.id, status: !user.isActive })
          }
        >
          {user.isActive === true ? LABELS.deactivate : LABELS.activate}
        </button>
      </div>
    </div>
  )
}
