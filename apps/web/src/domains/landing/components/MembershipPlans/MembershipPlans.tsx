import React, { useEffect, useState } from 'react'
import { Check, ChevronLeft, ChevronRight } from 'lucide-react'

import { styles } from './MembershipPlans.styled'
import { useMembershipPlans } from '@/domains/MembershipPlans/services/membershipPlans.queries'

export const MembershipPlans: React.FC = () => {
  const { data: membershipPlans = [], isLoading } = useMembershipPlans()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [visiblePlansCount, setVisiblePlansCount] = useState(3)

  const plans = membershipPlans.filter(
    (plan) => plan.status === 'active' && !plan.isDailyPlan,
  )

  useEffect(() => {
    const updateVisiblePlans = () => {
      if (window.innerWidth < 640) {
        setVisiblePlansCount(1)
        return
      }

      if (window.innerWidth < 1024) {
        setVisiblePlansCount(2)
        return
      }

      setVisiblePlansCount(3)
    }

    updateVisiblePlans()

    window.addEventListener('resize', updateVisiblePlans)

    return () => {
      window.removeEventListener('resize', updateVisiblePlans)
    }
  }, [])

  const maxIndex = Math.max(0, plans.length - visiblePlansCount)

  const canGoPrevious = currentIndex > 0
  const canGoNext = currentIndex < maxIndex

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  if (isLoading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.loading}>Loading membership plans...</div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>MEMBERSHIP PLANS</p>

          <h2 className={styles.title}>
            Choose the plan that fits your goals.
          </h2>

          <p className={styles.description}>
            Flexible membership options designed to help you stay consistent and
            reach your fitness goals.
          </p>
        </div>

        <div className={styles.carousel}>
          {plans.length > visiblePlansCount && (
            <button
              type="button"
              aria-label="Previous membership plans"
              onClick={handlePrevious}
              disabled={!canGoPrevious}
              className={styles.navigationButton}
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <div className={styles.viewport}>
            <div
              className={styles.track}
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / visiblePlansCount)
                }%)`,
              }}
            >
              {plans.map((plan) => {
                const isPopular = plan.name === 'Premium'

                return (
                  <div key={plan.id} className={styles.slide}>
                    <div
                      className={`${styles.card} ${
                        isPopular ? styles.popularCard : ''
                      }`}
                    >
                      {isPopular && (
                        <div className={styles.popularBadge}>Most Popular</div>
                      )}

                      <h3 className={styles.planName}>{plan.name}</h3>

                      <p className={styles.planDescription}>
                        {plan.description}
                      </p>

                      <div className={styles.price}>
                        <span className={styles.currency}>€</span>
                        {plan.price}
                      </div>

                      <p className={styles.duration}>
                        per {plan.duration} days
                      </p>

                      <div className={styles.divider} />

                      <ul className={styles.features}>
                        <li className={styles.feature}>
                          <span className={styles.check}>
                            <Check size={15} />
                          </span>
                          Full gym access
                        </li>

                        <li className={styles.feature}>
                          <span className={styles.check}>
                            <Check size={15} />
                          </span>
                          Modern equipment
                        </li>

                        <li className={styles.feature}>
                          <span className={styles.check}>
                            <Check size={15} />
                          </span>
                          {plan.duration}-day membership
                        </li>
                      </ul>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {plans.length > visiblePlansCount && (
            <button
              type="button"
              aria-label="Next membership plans"
              onClick={handleNext}
              disabled={!canGoNext}
              className={styles.navigationButton}
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
