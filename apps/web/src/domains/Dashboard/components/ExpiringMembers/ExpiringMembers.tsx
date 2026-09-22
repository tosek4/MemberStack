import React from 'react'
import { Clock3 } from 'lucide-react'
import { styles } from './ExpiringMembers.styled'
import { ExpiringMembersProps } from './types'
import { useRouter } from 'next/router'

export const ExpiringMembers: React.FC<ExpiringMembersProps> = ({
  members,
}) => {
  const router = useRouter()

  const handleClickMember = (memberId: number) => {
    router.push(`/members/${memberId}`)
  }

  return (
    <section className={styles.root}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Expiring memberships</h2>

          <p className={styles.subtitle}>Members who need attention</p>
        </div>

        <Clock3 size={18} className={styles.headerIcon} />
      </div>

      <div className={styles.list}>
        {members?.length === 0 ? (
          <div className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
            No memberships expiring soon.
          </div>
        ) : (
          members?.map((member) => (
            <div
              key={member.id}
              className={styles.item}
              onClick={() => handleClickMember(member.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  handleClickMember(member.id)
                }
              }}
            >
              <div className={styles.member}>
                <div className={styles.avatar}>
                  {member.firstName.charAt(0)}
                  {member.lastName.charAt(0)}
                </div>

                <div className={styles.memberInfo}>
                  <span className={styles.memberName}>
                    {member.firstName} {member.lastName}
                  </span>

                  <span className={styles.plan}>{member.planName}</span>
                </div>
              </div>

              <span className={styles.expiry}>
                {member.daysRemaining === 1
                  ? '1 day'
                  : `${member.daysRemaining} days`}
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
