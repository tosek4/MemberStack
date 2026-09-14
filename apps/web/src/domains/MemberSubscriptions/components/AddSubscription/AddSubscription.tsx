'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import {
  AddSubscriptionFormData,
  AddSubscriptionProps,
} from '../../types'

import { styles } from './AddSubscription.styled'

const mockMembers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael@example.com',
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@example.com',
  },
]

const mockPlans = [
  {
    id: '1',
    name: 'Basic',
    price: 25,
    durationDays: 30,
  },
  {
    id: '2',
    name: 'Standard',
    price: 32,
    durationDays: 30,
  },
  {
    id: '3',
    name: 'Premium',
    price: 40,
    durationDays: 30,
  },
  {
    id: '4',
    name: 'Annual',
    price: 350,
    durationDays: 365,
  },
]

export const AddSubscription: React.FC<
  AddSubscriptionProps
> = ({ loading = false, onSubmit }) => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddSubscriptionFormData>()

  const submit = async (
    data: AddSubscriptionFormData,
  ) => {
    await onSubmit?.(data)

    router.push('/subscriptions')
  }

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Add Subscription
          </h1>

          <p className={styles.subtitle}>
            Create a new membership subscription for a member.
          </p>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit(submit)}
        >
          <div className={styles.field}>
            <label className={styles.label}>
              Member
            </label>

            <select
              {...register('memberId', {
                required: 'Member is required',
              })}
              className={styles.input}
              defaultValue=""
            >
              <option value="" disabled>
                Select a member
              </option>

              {mockMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name} — {member.email}
                </option>
              ))}
            </select>

            {errors.memberId && (
              <p className={styles.error}>
                {errors.memberId.message}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              Membership plan
            </label>

            <select
              {...register('planId', {
                required: 'Membership plan is required',
              })}
              className={styles.input}
              defaultValue=""
            >
              <option value="" disabled>
                Select a membership plan
              </option>

              {mockPlans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name} — €{plan.price} /{' '}
                  {plan.durationDays} days
                </option>
              ))}
            </select>

            {errors.planId && (
              <p className={styles.error}>
                {errors.planId.message}
              </p>
            )}
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>
                Start date
              </label>

              <input
                type="date"
                {...register('startDate', {
                  required: 'Start date is required',
                })}
                className={styles.input}
              />

              {errors.startDate && (
                <p className={styles.error}>
                  {errors.startDate.message}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                End date
              </label>

              <input
                type="date"
                {...register('endDate', {
                  required: 'End date is required',
                })}
                className={styles.input}
              />

              {errors.endDate && (
                <p className={styles.error}>
                  {errors.endDate.message}
                </p>
              )}
            </div>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => router.push('/subscriptions')}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading
                ? 'Creating...'
                : 'Create subscription'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}