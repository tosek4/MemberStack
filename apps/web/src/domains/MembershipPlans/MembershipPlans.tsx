import React, { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/router'

import { MembershipPlanCard } from './components/MembershipPlanCard'
import { MembershipPlan } from './types'
import { LABELS } from './utils/labels'

import { styles } from './MembershipPlans.styled'

const mockPlans: MembershipPlan[] = [
  {
    id: '1',
    name: 'Basic',
    price: 25,
    currency: '€',
    durationDays: 30,
    description: 'Basic access to the gym',
    status: 'active',
    activeMembers: 214,
  },
  {
    id: '2',
    name: 'Standard',
    price: 32,
    currency: '€',
    durationDays: 30,
    description: 'Full gym access with additional benefits',
    status: 'active',
    activeMembers: 321,
  },
  {
    id: '3',
    name: 'Premium',
    price: 40,
    currency: '€',
    durationDays: 30,
    description: 'Full access with premium benefits',
    status: 'active',
    activeMembers: 186,
  },
  {
    id: '4',
    name: 'Annual',
    price: 350,
    currency: '€',
    durationDays: 365,
    description: 'Best value for long-term members',
    status: 'inactive',
    activeMembers: 0,
  },
]

export const MembershipPlans: React.FC = () => {
  const router = useRouter()

  const [plans, setPlans] = useState<MembershipPlan[]>(mockPlans)

  const activePlans = useMemo(
    () => plans.filter((plan) => plan.status === 'active'),
    [plans],
  )

  const handleEdit = (plan: MembershipPlan) => {
    router.push(`/membershipPlans/${plan.id}`)
  }

  const handleDelete = (plan: MembershipPlan) => {
    setPlans((current) =>
      current.map((item) =>
        item.id === plan.id ? { ...item, status: 'inactive' } : item,
      ),
    )
  }

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header.wrapper}>
          <div>
            <h1 className={styles.header.title}>{LABELS.title}</h1>

            <p className={styles.header.subtitle}>{LABELS.subtitle}</p>
          </div>

          <button
            type="button"
            className={styles.header.addButton}
            onClick={() => router.push('/membershipPlans/new')}
          >
            <Plus size={18} />
            {LABELS.addPlan}
          </button>
        </div>

        {activePlans.length === 0 ? (
          <div className={styles.empty}>
            <h2 className={styles.emptyTitle}>{LABELS.emptyTitle}</h2>

            <p className={styles.emptyText}>{LABELS.emptyText}</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {plans.map((plan) => (
              <MembershipPlanCard
                key={plan.id}
                plan={plan}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
