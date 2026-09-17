import React from 'react'
import { useRouter } from 'next/router'
import { ArrowLeft, RefreshCw } from 'lucide-react'

import { SubscriptionDetailsProps } from './types'
import { styles } from './SubscriptionDetails.styled'
import { LABELS } from '../../utils/labels'
import { formatDate } from '../../../../utils/dateFormat'

export const SubscriptionDetails: React.FC<SubscriptionDetailsProps> = ({
  subscription,
  onBack,
  onRenew,
}) => {
  const router = useRouter()

  const handleBack = () => {
    if (onBack) {
      onBack()
      return
    }

    router.push('/subscriptions')
  }
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

  const initials = subscription.member.firstName
    .split(' ')
    .map((name) => name.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header.wrapper}>
          <div className={styles.header.content}>
            <h1 className={styles.header.title}>Subscription Details</h1>

            <p className={styles.header.subtitle}>
              View membership subscription information.
            </p>
          </div>

          <button
            type="button"
            className={styles.backButton}
            onClick={handleBack}
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        <div className={styles.card}>
          <section className={styles.section.wrapper}>
            <div className={styles.member.wrapper}>
              <div className={styles.member.avatar}>{initials}</div>

              <div className={styles.member.info}>
                <h2 className={styles.member.name}>
                  {subscription.member.firstName} {subscription.member.lastName}
                </h2>

                <p className={styles.member.email}>
                  {subscription.member.email}
                </p>
              </div>

              <span
                className={`${styles.status} ${
                  statusStyles[subscription.status]
                }`}
              >
                {statusLabels[subscription.status]}
              </span>
            </div>
          </section>

          <section className={styles.section.last}>
            <h2 className={styles.section.title}>Subscription Information</h2>

            <div className={styles.grid}>
              <div>
                <p className={styles.detail.label}>Plan</p>

                <p className={styles.detail.value}>
                  {subscription.membershipPlan.name}
                </p>
              </div>

              <div>
                <p className={styles.detail.label}>Price</p>

                <p className={styles.detail.value}>
                  €{subscription.membershipPlan.price}
                </p>
              </div>

              <div>
                <p className={styles.detail.label}>Start date</p>

                <p className={styles.detail.value}>
                  {formatDate(subscription.startedAt)}
                </p>
              </div>

              <div>
                <p className={styles.detail.label}>End date</p>

                <p className={styles.detail.value}>
                  {formatDate(subscription.expiresAt)}
                </p>
              </div>

              <div>
                <p className={styles.detail.label}>Subscription ID</p>

                <p className={styles.detail.value}>{subscription.id}</p>
              </div>

              <div>
                <p className={styles.detail.label}>Member ID</p>

                <p className={styles.detail.value}>{subscription.memberId}</p>
              </div>
            </div>
          </section>

          <div className={styles.actions.wrapper}>
            <button
              type="button"
              className={styles.actions.renew}
              onClick={onRenew}
            >
              <RefreshCw size={16} />
              {LABELS.renew}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
