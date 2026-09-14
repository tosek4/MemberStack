import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import type {
  AddPaymentFormData,
  AddPaymentProps,
  PaymentMethod,
  PaymentStatus,
} from '../../types'

import {
  PAYMENT_METHOD_LABELS,
  PAYMENT_STATUS_LABELS,
} from '../../utils/labels'

import { styles } from './AddPayment.styled'
import { MockMember, MockSubscription } from './types'

const MOCK_MEMBERS: MockMember[] = [
  {
    id: 'member-1',
    name: 'John Smith',
    email: 'john@example.com',
  },
  {
    id: 'member-2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
  },
  {
    id: 'member-3',
    name: 'Michael Brown',
    email: 'michael@example.com',
  },
]

const MOCK_SUBSCRIPTIONS: MockSubscription[] = [
  {
    id: 'subscription-1',
    memberId: 'member-1',
    planName: 'Monthly Membership',
    price: 40,
    currency: 'EUR',
    status: 'active',
  },
  {
    id: 'subscription-2',
    memberId: 'member-1',
    planName: 'Premium Membership',
    price: 60,
    currency: 'EUR',
    status: 'active',
  },
  {
    id: 'subscription-3',
    memberId: 'member-2',
    planName: 'Monthly Membership',
    price: 40,
    currency: 'EUR',
    status: 'expiring',
  },
  {
    id: 'subscription-4',
    memberId: 'member-3',
    planName: 'Annual Membership',
    price: 400,
    currency: 'EUR',
    status: 'active',
  },
]

export const AddPayment: React.FC<AddPaymentProps> = ({
  loading = false,
  onSubmit,
}) => {
  const [selectedMemberId, setSelectedMemberId] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddPaymentFormData>({
    defaultValues: {
      memberId: '',
      memberSubscriptionId: '',
      amount: 0,
      method: 'cash',
      status: 'paid',
      paymentDate: new Date().toISOString().split('T')[0],
      reference: '',
    },
  })

  const selectedSubscriptionId = watch('memberSubscriptionId')

  const availableSubscriptions = useMemo(() => {
    return MOCK_SUBSCRIPTIONS.filter(
      (subscription) =>
        subscription.memberId === selectedMemberId &&
        subscription.status !== 'expired',
    )
  }, [selectedMemberId])

  const handleMemberChange = (memberId: string) => {
    setSelectedMemberId(memberId)

    setValue('memberId', memberId)
    setValue('memberSubscriptionId', '')
    setValue('amount', 0)
  }

  const handleSubscriptionChange = (subscriptionId: string) => {
    setValue('memberSubscriptionId', subscriptionId)

    const subscription = MOCK_SUBSCRIPTIONS.find(
      (item) => item.id === subscriptionId,
    )

    if (subscription) {
      setValue('amount', subscription.price)
    }
  }

  const handleFormSubmit = async (data: AddPaymentFormData) => {
    await onSubmit?.(data)
  }

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.header.title}>Add Payment</h2>

        <p className={styles.header.description}>
          Record a payment received from a gym member.
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
        <div className={styles.field.wrapper}>
          <label className={styles.field.label}>Member</label>

          <select
            {...register('memberId', {
              required: 'Member is required',
            })}
            value={selectedMemberId}
            onChange={(event) => handleMemberChange(event.target.value)}
            className={styles.field.select}
          >
            <option value="">Select member</option>

            {MOCK_MEMBERS.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name} — {member.email}
              </option>
            ))}
          </select>

          {errors.memberId && (
            <span className={styles.field.error}>
              {errors.memberId.message}
            </span>
          )}
        </div>

        <div className={styles.field.wrapper}>
          <label className={styles.field.label}>Subscription</label>

          <select
            {...register('memberSubscriptionId', {
              required: 'Subscription is required',
            })}
            value={selectedSubscriptionId}
            onChange={(event) => handleSubscriptionChange(event.target.value)}
            disabled={!selectedMemberId}
            className={styles.field.select}
          >
            <option value="">
              {selectedMemberId ? 'Select subscription' : 'Select member first'}
            </option>

            {availableSubscriptions.map((subscription) => (
              <option key={subscription.id} value={subscription.id}>
                {subscription.planName} — {subscription.price}{' '}
                {subscription.currency}
              </option>
            ))}
          </select>

          {errors.memberSubscriptionId && (
            <span className={styles.field.error}>
              {errors.memberSubscriptionId.message}
            </span>
          )}
        </div>

        <div className={styles.field.wrapper}>
          <label className={styles.field.label}>Amount</label>

          <input
            type="number"
            step="0.01"
            min="0"
            {...register('amount', {
              required: 'Amount is required',
              valueAsNumber: true,
              min: {
                value: 0.01,
                message: 'Amount must be greater than 0',
              },
            })}
            className={styles.field.input}
          />

          {errors.amount && (
            <span className={styles.field.error}>{errors.amount.message}</span>
          )}
        </div>

        <div className={styles.field.wrapper}>
          <label className={styles.field.label}>Payment Method</label>

          <select {...register('method')} className={styles.field.select}>
            {(
              Object.entries(PAYMENT_METHOD_LABELS) as [PaymentMethod, string][]
            ).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field.wrapper}>
          <label className={styles.field.label}>Status</label>

          <select {...register('status')} className={styles.field.select}>
            {(
              Object.entries(PAYMENT_STATUS_LABELS) as [PaymentStatus, string][]
            ).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field.wrapper}>
          <label className={styles.field.label}>Payment Date</label>

          <input
            type="date"
            {...register('paymentDate', {
              required: 'Payment date is required',
            })}
            className={styles.field.input}
          />

          {errors.paymentDate && (
            <span className={styles.field.error}>
              {errors.paymentDate.message}
            </span>
          )}
        </div>

        <div className={`${styles.field.wrapper} ${styles.field.full}`}>
          <label className={styles.field.label}>Reference</label>

          <input
            type="text"
            {...register('reference')}
            placeholder="Optional transaction or receipt reference"
            className={styles.field.input}
          />
        </div>

        <div className={`${styles.field.full} ${styles.actions}`}>
          <button
            type="button"
            className={styles.cancel}
            onClick={() => window.history.back()}
          >
            Cancel
          </button>

          <button type="submit" disabled={loading} className={styles.submit}>
            {loading ? 'Saving...' : 'Add Payment'}
          </button>
        </div>
      </form>
    </div>
  )
}
