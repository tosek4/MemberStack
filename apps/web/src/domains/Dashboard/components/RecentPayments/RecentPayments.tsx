import React from 'react'
import { ArrowRight, CreditCard } from 'lucide-react'
import { useRouter } from 'next/router'

import { styles } from './RecentPayments.styled'
import { RecentPaymentsProps } from './types'

export const RecentPayments: React.FC<RecentPaymentsProps> = ({ payments }) => {
  const router = useRouter()

  const handleClickMember = (memberId: number) => {
    router.push(`/members/${memberId}`)
  }

  return (
    <section className={styles.root}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Recent payments</h2>

          <p className={styles.subtitle}>Latest membership payments</p>
        </div>

        <CreditCard size={18} className={styles.headerIcon} />
      </div>

      <div className={styles.list}>
        {payments?.length === 0 ? (
          <div className={styles.empty}>No recent payments.</div>
        ) : (
          payments?.map((payment) => (
            <div
              key={payment.id}
              className={styles.item}
              onClick={() => handleClickMember(payment.memberId)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  handleClickMember(payment.memberId)
                }
              }}
            >
              <div className={styles.member}>
                <div className={styles.avatar}>
                  {payment.firstName.charAt(0)}
                  {payment.lastName.charAt(0)}
                </div>

                <div className={styles.memberInfo}>
                  <span className={styles.memberName}>
                    {payment.firstName} {payment.lastName}
                  </span>

                  <span className={styles.plan}>{payment.planName}</span>
                </div>
              </div>

              <div className={styles.payment}>
                <span className={styles.amount}>{payment.amount}</span>

                <span className={styles.date}>{payment.date}</span>
              </div>

              <ArrowRight size={16} className={styles.arrow} />
            </div>
          ))
        )}
      </div>
    </section>
  )
}
