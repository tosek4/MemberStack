import React from 'react'
import { CalendarDays, Eye, RefreshCw } from 'lucide-react'

import { SubscriptionCardProps } from '../../types'

import { styles } from './SubscriptionCard.styled'
import { LABELS } from '../../utils/labels'
import { formatDate } from '@/utils/dateFormat'

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  subscription,
  onView,
  onRenew,
}) => {
  const statusStyles = {
    active: styles.status.active,
    inactive: styles.status.inactive,
    expired: styles.status.expired,
    suspended: styles.status.suspended,
    blocked: styles.status.blocked,
  }

  const statusLabels = {
    active: LABELS.active,
    inactive: LABELS.inactive,
    expired: LABELS.expired,
    suspended: LABELS.suspended,
    blocked: LABELS.blocked,
  }

  return (
    <article className={styles.root}>
      <div className={styles.header.wrapper}>
        <div className={styles.member.wrapper}>
          <div className={styles.member.avatar}>
            {subscription.member.firstName
              .split(' ')
              .map((name) => name.charAt(0))
              .join('')
              .slice(0, 2)
              .toUpperCase()}
          </div>

          <div className={styles.member.info}>
            <h2 className={styles.member.name}>
              {subscription.member.firstName} {subscription.member.lastName}
            </h2>

            <p className={styles.member.email}>{subscription.member.email}</p>
          </div>
        </div>

        <span
          className={`${styles.status.base} ${
            statusStyles[subscription.status]
          }`}
        >
          {statusLabels[subscription.status]}
        </span>
      </div>

      <div className={styles.plan.wrapper}>
        <div>
          <p className={styles.plan.label}>{LABELS.plan}</p>

          <p className={styles.plan.name}>{subscription.membershipPlan?.name}</p>
        </div>

        <div className={styles.plan.price}>
          €{subscription.membershipPlan.price}
        </div>
      </div>

      <div className={styles.dates.wrapper}>
        <div className={styles.dates.item}>
          <CalendarDays size={16} />

          <div>
            <p className={styles.dates.label}>{LABELS.startDate}</p>

            <p className={styles.dates.value}>
              {formatDate(subscription.startedAt)}
            </p>
          </div>
        </div>

        <div className={styles.dates.item}>
          <CalendarDays size={16} />

          <div>
            <p className={styles.dates.label}>{LABELS.endDate}</p>

            <p className={styles.dates.value}>
              {formatDate(subscription.expiresAt)}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.actions.wrapper}>
        <button
          type="button"
          className={styles.actions.view}
          onClick={() => onView?.(subscription)}
        >
          <Eye size={16} />
          {LABELS.view}
        </button>

        <button
          type="button"
          className={styles.actions.renew}
          onClick={() => onRenew?.(subscription)}
        >
          <RefreshCw size={16} />
          {LABELS.renew}
        </button>
      </div>
    </article>
  )
}
