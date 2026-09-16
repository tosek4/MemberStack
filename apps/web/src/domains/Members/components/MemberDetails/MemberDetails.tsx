import React from 'react'
import { useRouter } from 'next/router'

import { useMember } from '../../services'
import { styles } from './MemberDetails.styled'

export const MemberDetails: React.FC = () => {
  const router = useRouter()

  const id = Number(router.query.id)

  const { data: member, isLoading, isError } = useMember(id as number)

  if (isLoading) {
    return (
      <main className={styles.root}>
        <div className={styles.container}>
          <div className={styles.card}>
            <p className={styles.details.value}>Loading member...</p>
          </div>
        </div>
      </main>
    )
  }

  if (isError || !member) {
    return (
      <main className={styles.root}>
        <div className={styles.container}>
          <div className={styles.card}>
            <p className={styles.details.value}>Failed to load member.</p>

            <button
              type="button"
              className={styles.header.backButton}
              onClick={() => router.push('/members')}
            >
              ← Back to members
            </button>
          </div>
        </div>
      </main>
    )
  }

  const fullName = `${member.firstName} ${member.lastName}`

  const initials = `${member.firstName.charAt(
    0,
  )}${member.lastName.charAt(0)}`.toUpperCase()

  const subscription = member.activeSubscription

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header.wrapper}>
          <div>
            <button
              type="button"
              className={styles.header.backButton}
              onClick={() => router.push('/members')}
            >
              ← Back to members
            </button>

            <h1 className={styles.header.title}>Member details</h1>

            <p className={styles.header.subtitle}>
              View member and membership information.
            </p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.profile.wrapper}>
            <div className={styles.profile.avatar}>
              {member.profile_image ? (
                <img
                  src={member.profile_image}
                  alt={fullName}
                  className={styles.profile.image}
                />
              ) : (
                initials
              )}
            </div>

            <div>
              <h2 className={styles.profile.name}>{fullName}</h2>

              <p className={styles.profile.email}>{member.email}</p>
            </div>
          </div>

          <div className={styles.details.grid}>
            <div>
              <p className={styles.details.label}>Phone</p>

              <p className={styles.details.value}>{member.phone ?? '—'}</p>
            </div>

            <div>
              <p className={styles.details.label}>Birth date</p>

              <p className={styles.details.value}>
                {member.birthDate
                  ? new Date(member.birthDate).toLocaleDateString()
                  : '—'}
              </p>
            </div>

            <div>
              <p className={styles.details.label}>Gender</p>

              <p className={styles.details.value}>{member.gender ?? '—'}</p>
            </div>

            <div>
              <p className={styles.details.label}>Plan</p>

              <p className={styles.details.value}>
                {subscription?.membershipPlan?.name ?? '—'}
              </p>
            </div>

            <div>
              <p className={styles.details.label}>Start date</p>

              <p className={styles.details.value}>
                {subscription?.startedAt
                  ? new Date(subscription.startedAt).toLocaleDateString()
                  : '—'}
              </p>
            </div>

            <div>
              <p className={styles.details.label}>End date</p>

              <p className={styles.details.value}>
                {subscription?.expiresAt
                  ? new Date(subscription.expiresAt).toLocaleDateString()
                  : '—'}
              </p>
            </div>

            <div>
              <p className={styles.details.label}>Member status</p>

              <p className={styles.details.value}>{member.status}</p>
            </div>

            <div>
              <p className={styles.details.label}>Subscription status</p>

              <p className={styles.details.value}>
                {subscription?.status ?? '—'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
