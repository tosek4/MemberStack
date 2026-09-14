import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import type {
  CheckInFormData,
  CheckInProps,
  MockMember,
  MockSubscription,
} from '../../types'

import { styles } from './CheckIn.styled'

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
    validUntil: '2026-09-30',
    status: 'active',
  },
  {
    id: 'subscription-2',
    memberId: 'member-2',
    planName: 'Monthly Membership',
    validUntil: '2026-09-18',
    status: 'expiring',
  },
  {
    id: 'subscription-3',
    memberId: 'member-3',
    planName: 'Annual Membership',
    validUntil: '2027-03-10',
    status: 'active',
  },
]

export const CheckIn: React.FC<CheckInProps> = ({
  loading = false,
  onSubmit,
}) => {
  const [selectedMemberId, setSelectedMemberId] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CheckInFormData>()

  const selectedSubscriptionId = watch('memberSubscriptionId')

  const availableSubscriptions = useMemo(
    () =>
      MOCK_SUBSCRIPTIONS.filter(
        (subscription) =>
          subscription.memberId === selectedMemberId &&
          subscription.status !== 'expired',
      ),
    [selectedMemberId],
  )

  const handleMemberChange = (memberId: string) => {
    setSelectedMemberId(memberId)

    setValue('memberId', memberId)
    setValue('memberSubscriptionId', '')
  }

  const handleSubscriptionChange = (subscriptionId: string) => {
    setValue('memberSubscriptionId', subscriptionId)
  }

  const submit = async (data: CheckInFormData) => {
    await onSubmit?.(data)
  }

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>Check In Member</h2>

        <p className={styles.description}>Record a member visit to the gym.</p>
      </div>

      <form onSubmit={handleSubmit(submit)} className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>Member</label>

          <select
            {...register('memberId', {
              required: 'Member is required',
            })}
            value={selectedMemberId}
            onChange={(event) => handleMemberChange(event.target.value)}
            className={styles.select}
          >
            <option value="">Select member</option>

            {MOCK_MEMBERS.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name} — {member.email}
              </option>
            ))}
          </select>

          {errors.memberId && (
            <span className={styles.error}>{errors.memberId.message}</span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Subscription</label>

          <select
            {...register('memberSubscriptionId', {
              required: 'Subscription is required',
            })}
            value={selectedSubscriptionId || ''}
            onChange={(event) => handleSubscriptionChange(event.target.value)}
            disabled={!selectedMemberId}
            className={styles.select}
          >
            <option value="">
              {selectedMemberId ? 'Select subscription' : 'Select member first'}
            </option>

            {availableSubscriptions.map((subscription) => (
              <option key={subscription.id} value={subscription.id}>
                {subscription.planName} — valid until {subscription.validUntil}
              </option>
            ))}
          </select>

          {errors.memberSubscriptionId && (
            <span className={styles.error}>
              {errors.memberSubscriptionId.message}
            </span>
          )}
        </div>

        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? 'Checking In...' : 'Check In'}
        </button>
      </form>
    </div>
  )
}
