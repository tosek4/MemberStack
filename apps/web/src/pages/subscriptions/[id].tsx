import React from 'react'
import { useRouter } from 'next/router'

import { SubscriptionDetails } from '@domain/MemberSubscriptions/components/SubscriptionDetails'
import { mockSubscriptions } from '@domain/MemberSubscriptions/MemberSubscriptions'

export default function SubscriptionDetailsPage() {
  const router = useRouter()
  const { id } = router.query

  if (!router.isReady) {
    return null
  }

  const subscription = mockSubscriptions.find((item) => item.id === id)

  if (!subscription) {
    return (
      <main className="p-6">
        <h1 className="text-xl font-semibold">Subscription not found</h1>
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
