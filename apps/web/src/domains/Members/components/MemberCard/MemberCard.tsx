import React from 'react'
import { ChevronRight } from 'lucide-react'

import { MemberCardProps, MemberStatus } from '../../types'
import { styles } from './MemberCard.styled'
import { LABELS } from '../../utils/labels'

const statusStyles: Record<MemberStatus, string> = {
  active: styles.status.active,
  expiring: styles.status.expiring,
  expired: styles.status.expired,
  'no-subscription': styles.status.noSubscription,
}

const statusLabels: Record<MemberStatus, string> = {
  active: LABELS.active,
  expiring: LABELS.expiring,
  expired: LABELS.expired,
  'no-subscription': LABELS.noSubscription,
}

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()

export const MemberCard: React.FC<MemberCardProps> = ({ member, onView }) => {
  return (
    <article className={styles.root.base}>
      <div className={styles.header.wrapper}>
        <div className={styles.member.wrapper}>
          <div className={styles.member.avatar}>
            {member.photoUrl ? (
              <img
                src={member.photoUrl}
                alt={member.name}
                className={styles.member.avatarImage}
              />
            ) : (
              <span className={styles.member.initials}>
                {getInitials(member.name)}
              </span>
            )}
          </div>

          <div className={styles.member.info.wrapper}>
            <h3 className={styles.member.info.name}>{member.name}</h3>

            <p className={styles.member.info.email}>{member.email}</p>
          </div>
        </div>

        <span
          className={`${styles.status.base} ${statusStyles[member.status]}`}
        >
          {statusLabels[member.status]}
        </span>
      </div>

      <div className={styles.details.wrapper}>
        <div className={styles.details.item.wrapper}>
          <p className={styles.details.item.label}>{LABELS.plan}</p>

          <p className={styles.details.item.value}>{member.plan ?? '—'}</p>
        </div>

        <div className={styles.details.item.wrapper}>
          <p className={styles.details.item.label}>{LABELS.membership}</p>

          <p className={styles.details.item.value}>
            {member.startDate && member.endDate
              ? `${member.startDate} → ${member.endDate}`
              : '—'}
          </p>
        </div>
      </div>

      <div className={styles.footer.wrapper}>
        <button
          type="button"
          className={styles.footer.button}
          onClick={() => onView?.(member)}
        >
          <span>{LABELS.viewDetails}</span>
          <ChevronRight className="ml-1 inline-block h-4 w-4" />
        </button>
      </div>
    </article>
  )
}
