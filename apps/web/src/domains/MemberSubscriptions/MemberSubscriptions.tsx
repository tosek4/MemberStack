'use client'

import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/router'

import { SubscriptionCard } from './components/SubscriptionCard'
import { SubscriptionFilters } from './components/SubscriptionFilters'

import { MemberSubscription, SubscriptionStatusFilter } from './types'

import { LABELS } from './utils/labels'
import { styles } from './MemberSubscriptions.styled'
import { useRenewSubscription, useSubscriptions } from './services'
import { useDebounce } from '@/hooks/useDebounce'
import { PaymentMethod } from '@/components/PaymentMethodModal'
import { PaymentMethodModal } from '@/components/PaymentMethodModal/PaymentMethodModal'

export const MemberSubscriptions: React.FC = () => {
  const router = useRouter()

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<SubscriptionStatusFilter>('all')
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<
    number | null
  >(null)

  const debouncedSearch = useDebounce(search, 400)

  const {
    data: memberSubscriptions,
    isPending,
    isFetching,
    isError,
  } = useSubscriptions({
    search: debouncedSearch,
    status,
  })

  const renewSubscription = useRenewSubscription()

  const handleView = (subscription: MemberSubscription) => {
    router.push(`/subscriptions/${subscription.id}`)
  }

  const handleOpenPaymentModal = (subscriptionId: number) => {
    setSelectedSubscriptionId(subscriptionId)
    setPaymentModalOpen(true)
  }

  const handleRenew = (paymentMethod: PaymentMethod) => {
    if (!selectedSubscriptionId) {
      return
    }

    renewSubscription.mutate(
      {
        id: selectedSubscriptionId,
        paymentMethod,
      },
      {
        onSuccess: () => {
          setPaymentModalOpen(false)
          setSelectedSubscriptionId(null)
        },
      },
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

        {isFetching && !isPending && (
          <div className={styles.searchLoading}>Searching...</div>
        )}

        {isPending ? (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>Loading member subscriptions...</p>
          </div>
        ) : isError ? (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>
              Failed to load member subscriptions
            </p>

            <p className={styles.emptyText}>Please try again later.</p>
          </div>
        ) : memberSubscriptions?.length > 0 ? (
          <div className={styles.grid}>
            {memberSubscriptions?.map((subscription) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
                onView={handleView}
                onRenew={handleOpenPaymentModal}
              />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <h2 className={styles.emptyTitle}>{LABELS.emptyTitle}</h2>

            <p className={styles.emptyText}>{LABELS.emptyText}</p>
          </div>
        )}
      </div>
      <PaymentMethodModal
        open={paymentModalOpen}
        onClose={() => {
          setPaymentModalOpen(false)
          setSelectedSubscriptionId(null)
        }}
        onConfirm={(paymentMethod) => {
          handleRenew(paymentMethod)
        }}
      />{' '}
    </main>
  )
}
