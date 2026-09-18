'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { AddSubscriptionFormData } from '../../types'
import { styles } from './AddSubscription.styled'
import { useCreateSubscription } from '../../services'
import { useMembers } from '@/domains/Members/services'
import { useMembershipPlans } from '@/domains/MembershipPlans/services'

export const AddSubscription: React.FC = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddSubscriptionFormData>()

  const {
    data: members = [],
    isLoading: membersLoading,
    isError: membersError,
  } = useMembers()

  const {
    data: membershipPlans = [],
    isLoading: plansLoading,
    isError: plansError,
  } = useMembershipPlans()

  const createSubscription = useCreateSubscription()

  const isLoading =
    membersLoading || plansLoading || createSubscription.isPending

  const submit = (data: AddSubscriptionFormData) => {
    createSubscription.mutate(
      {
        memberId: data.memberId,
        membershipPlanId: data.membershipPlanId,
        startedAt: new Date(`${data.startDate}T00:00:00.000Z`).toISOString(),
        expiresAt: new Date(`${data.endDate}T23:59:59.999Z`).toISOString(),
        status: 'active',
      },
      {
        onSuccess: () => {
          router.push('/subscriptions')
        },
      },
    )
  }

  if (membersError || plansError) {
    return (
      <main className={styles.root}>
        <div className={styles.container}>
          <p className={styles.error}>
            Failed to load members or membership plans. Please try again later.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Add Subscription</h1>

          <p className={styles.subtitle}>
            Create a new membership subscription for a member.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit(submit)}>
          <div className={styles.field}>
            <label htmlFor="member" className={styles.label}>
              Member
            </label>

            <select
              id="member"
              {...register('memberId', {
                required: 'Member is required',
                valueAsNumber: true,
              })}
              className={styles.input}
              defaultValue=""
              disabled={isLoading}
            >
              <option value="" disabled>
                Select a member
              </option>

              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.firstName} {member.lastName} — {member.email}
                </option>
              ))}
            </select>

            {errors.memberId && (
              <p className={styles.error}>{errors.memberId.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="membership-plan" className={styles.label}>
              Membership plan
            </label>

            <select
              id="membershipPlan"
              {...register('membershipPlanId', {
                required: 'Membership plan is required',
                valueAsNumber: true,
              })}
              className={styles.input}
              defaultValue=""
              disabled={isLoading}
            >
              <option value="" disabled>
                Select a membership plan
              </option>

              {membershipPlans
                .filter((plan) => plan.status === 'active')
                .map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} — €{plan.price} / {plan.duration} days
                  </option>
                ))}
            </select>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="start-date" className={styles.label}>
                Start date
              </label>

              <input
                id="start-date"
                type="date"
                {...register('startDate', {
                  required: 'Start date is required',
                })}
                className={styles.input}
                disabled={isLoading}
              />

              {errors.startDate && (
                <p className={styles.error}>{errors.startDate.message}</p>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="end-date" className={styles.label}>
                End date
              </label>

              <input
                id="end-date"
                type="date"
                {...register('endDate', {
                  required: 'End date is required',
                })}
                className={styles.input}
                disabled={isLoading}
              />

              {errors.endDate && (
                <p className={styles.error}>{errors.endDate.message}</p>
              )}
            </div>
          </div>

          {createSubscription.error && (
            <p className={styles.error} role="alert">
              Failed to create subscription. Please try again.
            </p>
          )}

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => router.push('/subscriptions')}
              disabled={createSubscription.isPending}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className={styles.submitButton}
            >
              {createSubscription.isPending
                ? 'Creating...'
                : 'Create subscription'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
