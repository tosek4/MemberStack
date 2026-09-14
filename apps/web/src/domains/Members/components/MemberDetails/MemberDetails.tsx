import React from 'react'
import { useRouter } from 'next/router'

import { Member } from '../../types'
import { styles } from './MemberDetails.styled'

interface MemberDetailsProps {
  member: Member
}

export const MemberDetails: React.FC<MemberDetailsProps> = ({ member }) => {
  const router = useRouter()

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
              {member.photoUrl ? (
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  className={styles.profile.image}
                />
              ) : (
                member.name
                  .split(' ')
                  .map((part) => part.charAt(0))
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()
              )}
            </div>

            <div>
              <h2 className={styles.profile.name}>{member.name}</h2>

              <p className={styles.profile.email}>{member.email}</p>
            </div>
          </div>

          <div className={styles.details.grid}>
            <div>
              <p className={styles.details.label}>Phone</p>
              <p className={styles.details.value}>{member.phone ?? '—'}</p>
            </div>

            <div>
              <p className={styles.details.label}>Plan</p>
              <p className={styles.details.value}>{member.plan ?? '—'}</p>
            </div>

            <div>
              <p className={styles.details.label}>Start date</p>
              <p className={styles.details.value}>{member.startDate ?? '—'}</p>
            </div>

            <div>
              <p className={styles.details.label}>End date</p>
              <p className={styles.details.value}>{member.endDate ?? '—'}</p>
            </div>

            <div>
              <p className={styles.details.label}>Status</p>

              <p className={styles.details.value}>{member.status}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
