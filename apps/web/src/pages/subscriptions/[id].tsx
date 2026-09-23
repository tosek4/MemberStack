import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { SubscriptionDetails } from '@domain/MemberSubscriptions/components/SubscriptionDetails'
import {
  useRenewSubscription,
  useSubscription,
} from '@/domains/MemberSubscriptions/services'
import { PaymentMethodModal } from '@/components/PaymentMethodModal/PaymentMethodModal'
import { PaymentMethod } from '@/components/PaymentMethodModal'

export default function SubscriptionDetailsPage() {
  const router = useRouter()
  const { id } = router.query
  const subscriptionId = Number(id)
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)

  const {
    data: subscription,
    isLoading,
    isError,
  } = useSubscription(subscriptionId)

  const renewSubscription = useRenewSubscription()

  const handleRenew = (paymentMethod: PaymentMethod) => {
    renewSubscription.mutate({ id: subscriptionId, paymentMethod })
    router.push('/subscriptions')
  }

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
    <>
      <SubscriptionDetails
        subscription={subscription}
        onBack={() => router.push('/subscriptions')}
        onRenew={() => setPaymentModalOpen(true)}
      />
      <PaymentMethodModal
        open={paymentModalOpen}
        onClose={() => {
          setPaymentModalOpen(false)
        }}
        onConfirm={(paymentMethod) => {
          handleRenew(paymentMethod)
        }}
      />
    </>
  )
}
