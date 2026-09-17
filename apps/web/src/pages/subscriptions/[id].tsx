import React from 'react'
import { useRouter } from 'next/router'

import { SubscriptionDetails } from '@domain/MemberSubscriptions/components/SubscriptionDetails'
import { useSubscription } from '@/domains/MemberSubscriptions/services'

export default function SubscriptionDetailsPage() {
  const router = useRouter()
  const { id } = router.query
  const subscriptionId = Number(id)

  const {
    data: subscription,
    isLoading,
    isError,
  } = useSubscription(subscriptionId)

  if (!router.isReady) {
    return null
  }

  if (!subscription || isLoading) {
    return (
      <main className="p-6">
        <h1 className="text-xl font-semibold">Subscription not found</h1>
      </main>
    )
  }

  if (isError || !subscription) {
    return (
      <main className="m-4">
        <h1>Subscription not found</h1>
        <p>The subscription could not be loaded.</p>
      </main>
    )
  }

  return (
    <SubscriptionDetails
      subscription={subscription}
      onBack={() => router.push('/subscriptions')}
      onRenew={() => {
        console.log('Renew subscription:', subscription.id)
      }}
    />
  )
}
