'use client'

import React, { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/router'

import { SubscriptionCard } from './components/SubscriptionCard'
import { SubscriptionFilters } from './components/SubscriptionFilters'

import {
  MemberSubscription,
  SubscriptionStatusFilter,
} from './types'

import { LABELS } from './utils/labels'
import { styles } from './MemberSubscriptions.styled'

const mockSubscriptions: MemberSubscription[] = [
  {
    id: '1',
    memberId: '1',
    memberName: 'John Doe',
    memberEmail: 'john@example.com',
    planName: 'Premium',
    price: 40,
    currency: '€',
    startDate: '01 Sep 2026',
    endDate: '01 Oct 2026',
    status: 'active',
  },
  {
    id: '2',
    memberId: '2',
    memberName: 'Sarah Wilson',
    memberEmail: 'sarah@example.com',
    planName: 'Standard',
    price: 32,
    currency: '€',
    startDate: '20 Aug 2026',
    endDate: '20 Sep 2026',
    status: 'expiring',
  },
  {
    id: '3',
    memberId: '3',
    memberName: 'Michael Brown',
    memberEmail: 'michael@example.com',
    planName: 'Basic',
    price: 25,
    currency: '€',
    startDate: '01 Aug 2026',
    endDate: '31 Aug 2026',
    status: 'expired',
  },
  {
    id: '4',
    memberId: '4',
    memberName: 'Emily Davis',
    memberEmail: 'emily@example.com',
    planName: 'Premium',
    price: 40,
    currency: '€',
    startDate: '05 Sep 2026',
    endDate: '05 Oct 2026',
    status: 'active',
  },
  {
    id: '5',
    memberId: '5',
    memberName: 'David Miller',
    memberEmail: 'david@example.com',
    planName: 'Standard',
    price: 32,
    currency: '€',
    startDate: '15 Aug 2026',
    endDate: '15 Sep 2026',
    status: 'expiring',
  },
]

export const MemberSubscriptions: React.FC = () => {
  const router = useRouter()

  const [search, setSearch] = useState('')
  const [status, setStatus] =
    useState<SubscriptionStatusFilter>('all')

  const filteredSubscriptions = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim()

    return mockSubscriptions.filter((subscription) => {
      const matchesSearch =
        !normalizedSearch ||
        subscription.memberName
          .toLowerCase()
          .includes(normalizedSearch) ||
        subscription.memberEmail
          .toLowerCase()
          .includes(normalizedSearch)

      const matchesStatus =
        status === 'all' ||
        subscription.status === status

      return matchesSearch && matchesStatus
    })
  }, [search, status])

  const handleView = (subscription: MemberSubscription) => {
    router.push(
      `/subscriptions/${subscription.id}`,
    )
  }

  const handleRenew = (subscription: MemberSubscription) => {
    console.log('Renew subscription:', subscription)
  }

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header.wrapper}>
          <div>
            <h1 className={styles.header.title}>
              {LABELS.title}
            </h1>

            <p className={styles.header.subtitle}>
              {LABELS.subtitle}
            </p>
          </div>

          <button
            type="button"
            className={styles.header.addButton}
            onClick={() =>
              router.push('/subscriptions/new')
            }
          >
            <Plus size={18} />
            {LABELS.addSubscription}
          </button>
        </div>

        <SubscriptionFilters
          search={search}
          status={status}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
        />

        {filteredSubscriptions.length === 0 ? (
          <div className={styles.empty}>
            <h2 className={styles.emptyTitle}>
              {LABELS.emptyTitle}
            </h2>

            <p className={styles.emptyText}>
              {LABELS.emptyText}
            </p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filteredSubscriptions.map((subscription) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
                onView={handleView}
                onRenew={handleRenew}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}