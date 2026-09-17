'use client'

import React, { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/router'

import { SubscriptionCard } from './components/SubscriptionCard'
import { SubscriptionFilters } from './components/SubscriptionFilters'

import { MemberSubscription, SubscriptionStatusFilter } from './types'

import { LABELS } from './utils/labels'
import { styles } from './MemberSubscriptions.styled'
import { useSubscriptions } from './services'

export const MemberSubscriptions: React.FC = () => {
  const router = useRouter()

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<SubscriptionStatusFilter>('all')

  const { data: memberSubscriptions, isLoading, isError } = useSubscriptions()

  const filteredSubscriptions = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim()

    return memberSubscriptions?.filter((subscription) => {
      const matchesSearch =
        !normalizedSearch ||
        subscription.member.firstName
          .toLowerCase()
          .includes(normalizedSearch) ||
        subscription.member.lastName.toLowerCase().includes(normalizedSearch) ||
        subscription.member.email.toLowerCase().includes(normalizedSearch)

      const matchesStatus = status === 'all' || subscription.status === status
      return matchesSearch && matchesStatus
    })
  }, [memberSubscriptions, search, status])

  const handleView = (subscription: MemberSubscription) => {
    router.push(`/subscriptions/${subscription.id}`)
  }

  const handleRenew = (subscription: MemberSubscription) => {
    console.log('Renew subscription:', subscription)
  }

  if (isLoading) {
    return (
      <main className={styles.root}>
        <div className={styles.container}>
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>Loading member subscriptions...</p>
          </div>
        </div>
      </main>
    )
  }

  if (isError) {
    return (
      <main className={styles.root}>
        <div className={styles.container}>
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>
              Failed to load member subscriptions
            </p>

            <p className={styles.emptyText}>Please try again later.</p>
          </div>
        </div>
      </main>
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
            onClick={() => router.push('/subscriptions/new')}
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

        {filteredSubscriptions?.length === 0 ? (
          <div className={styles.empty}>
            <h2 className={styles.emptyTitle}>{LABELS.emptyTitle}</h2>

            <p className={styles.emptyText}>{LABELS.emptyText}</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filteredSubscriptions?.map((subscription) => (
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
