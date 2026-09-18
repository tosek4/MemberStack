import React from 'react'
import type { PaymentCardProps } from './types'

import { styles } from './PaymentCard.styled'
import { formatDate } from '@/utils/dateFormat'

export const PaymentCard: React.FC<PaymentCardProps> = ({
  payment,
  onView,
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  }

  const statusClassName = {
    paid: styles.badge.paid,
    pending: styles.badge.pending,
    failed: styles.badge.failed,
    refunded: styles.badge.refunded,
  }[payment.status]

  return (
    <div className={styles.card.base}>
      <div className={styles.header.base}>
        <div className={styles.member.wrapper}>
          <div className={styles.member.avatar}>
            {getInitials(payment.memberName)}
          </div>

          <div className={styles.member.info}>
            <p className={styles.member.name}>{payment.memberName}</p>

            <p className={styles.member.email}>{payment.memberEmail}</p>
          </div>
        </div>

        <div className={styles.amount.wrapper}>
          <span className={styles.amount.value}>
            {payment.amount.toFixed(2)}
          </span>

          <span className={styles.amount.currency}>{payment.currency}</span>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.details.grid}>
        <div className={styles.details.item}>
          <p className={styles.details.label}>Subscription</p>

          <p className={styles.details.value}>{payment.planName}</p>
        </div>

        <div className={styles.details.item}>
          <p className={styles.details.label}>Payment Method</p>

          <p className={styles.method.base}>{payment.method}</p>
        </div>

        <div className={styles.details.item}>
          <p className={styles.details.label}>Status</p>

          <span className={`${styles.badge.base} ${statusClassName}`}>
            {payment.status}
          </span>
        </div>

        <div className={styles.details.item}>
          <p className={styles.details.label}>Payment Date</p>

          <p className={styles.details.value}>
            {formatDate(payment.paymentDate)}
          </p>
        </div>
      </div>

      <div className={styles.footer.base}>
        <span className={styles.footer.date}>
          {payment.reference ? `Ref: ${payment.reference}` : 'No reference'}
        </span>

        {onView && (
          <button
            type="button"
            className={styles.footer.action}
            onClick={() => onView(payment)}
          >
            View
          </button>
        )}
      </div>
    </div>
  )
}
