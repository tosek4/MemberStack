'use client'

import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { AddSubscriptionFormData } from '../../types'
import { styles } from './AddSubscription.styled'
import { useCreateSubscription } from '../../services'
import { useMembers } from '@/domains/Members/services'
import { useMembershipPlans } from '@/domains/MembershipPlans/services'
import { getCurrentDate } from '@/utils/dateFormat'
import { addDays, paymentMethods } from './utils'
import { Member } from '@/domains/Members/types'

export const AddSubscription: React.FC = () => {
  const router = useRouter()

  const [memberSearch, setMemberSearch] = useState('')
  const [isMemberDropdownOpen, setIsMemberDropdownOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    resetField,
    formState: { errors },
  } = useForm<AddSubscriptionFormData>({
    defaultValues: {
      memberId: undefined,
      membershipPlanId: undefined,
      startDate: getCurrentDate(),
      endDate: '',
      paymentMethod: 'cash',
    },
  })

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

  const startDate = watch('startDate')
  const membershipPlanId = watch('membershipPlanId')

  const activePlans = useMemo(
    () => membershipPlans.filter((plan) => plan.status === 'active'),
    [membershipPlans],
  )

  const filteredMembers = useMemo(() => {
    const search = memberSearch.trim().toLowerCase()

    if (!search) {
      return members
    }

    return members.filter((member) => {
      const fullName = `${member.firstName} ${member.lastName}`.toLowerCase()

      return (
        fullName.includes(search) ||
        member.firstName.toLowerCase().includes(search) ||
        member.lastName.toLowerCase().includes(search) ||
        member.email.toLowerCase().includes(search) ||
        member.phone?.toLowerCase().includes(search)
      )
    })
  }, [members, memberSearch])

  const updateEndDate = (newStartDate: string, newPlanId?: number) => {
    const planId = newPlanId ?? membershipPlanId

    if (!newStartDate || !planId) {
      setValue('endDate', '')
      return
    }

    const plan = activePlans.find((item) => item.id === Number(planId))

    if (!plan) {
      setValue('endDate', '')
      return
    }

    setValue('endDate', addDays(newStartDate, plan.duration), {
      shouldValidate: true,
    })
  }

  const handleSelectMember = (member: Member) => {
    setSelectedMember(member)
    setMemberSearch(`${member.firstName} ${member.lastName}`)
    setIsMemberDropdownOpen(false)

    setValue('memberId', member.id, {
      shouldValidate: true,
    })

    const latestPlanId = member.latestSubscription?.membershipPlanId

    if (!latestPlanId) {
      setValue('membershipPlanId', undefined)
      setValue('endDate', '')
      return
    }

    setValue('membershipPlanId', latestPlanId, {
      shouldValidate: true,
    })

    updateEndDate(startDate, latestPlanId)
  }

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value

    setValue('startDate', value, {
      shouldValidate: true,
    })

    updateEndDate(value)
  }

  const handlePlanChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value)

    setValue('membershipPlanId', value, {
      shouldValidate: true,
    })

    updateEndDate(startDate, value)
  }

  const clearMember = () => {
    setSelectedMember(null)
    setMemberSearch('')
    setIsMemberDropdownOpen(false)

    resetField('memberId')
    resetField('membershipPlanId')
    resetField('endDate')
  }

  const submit = (data: AddSubscriptionFormData) => {
    createSubscription.mutate(
      {
        memberId: data.memberId,
        membershipPlanId: data.membershipPlanId as number,
        startedAt: new Date(`${data.startDate}T00:00:00.000Z`).toISOString(),
        expiresAt: new Date(`${data.endDate}T23:59:59.999Z`).toISOString(),
        status: 'active',
        paymentMethod: data.paymentMethod,
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
          {/* Member */}
          <div className={styles.field}>
            <label htmlFor="member-search" className={styles.label}>
              Member
            </label>

            <div className="relative">
              <input
                id="member-search"
                type="text"
                value={memberSearch}
                onChange={(event) => {
                  setMemberSearch(event.target.value)
                  setIsMemberDropdownOpen(true)
                }}
                onFocus={() => setIsMemberDropdownOpen(true)}
                className={styles.input}
                placeholder="Search member by name, email or phone..."
                disabled={isLoading}
                autoComplete="off"
              />

              {selectedMember && (
                <button
                  type="button"
                  onClick={clearMember}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  ×
                </button>
              )}

              {isMemberDropdownOpen && !selectedMember && (
                <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-60 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                  {filteredMembers.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      No members found.
                    </div>
                  ) : (
                    filteredMembers.map((member) => (
                      <button
                        key={member.id}
                        type="button"
                        onClick={() => handleSelectMember(member)}
                        className="flex w-full flex-col px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {member.firstName} {member.lastName}
                        </span>

                        <span className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                          {member.email}
                          {member.phone ? ` · ${member.phone}` : ''}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            {errors.memberId && (
              <p className={styles.error}>{errors.memberId.message}</p>
            )}
          </div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="membership-plan" className={styles.label}>
                Membership plan
              </label>

              <select
                id="membership-plan"
                {...register('membershipPlanId', {
                  required: 'Membership plan is required',
                  valueAsNumber: true,
                })}
                onChange={handlePlanChange}
                className={styles.input}
                disabled={isLoading || !selectedMember}
              >
                <option value="">
                  {selectedMember
                    ? 'Select a membership plan'
                    : 'Select a member first'}
                </option>

                {activePlans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} — €{plan.price} / {plan.duration} days
                  </option>
                ))}
              </select>

              {errors.membershipPlanId && (
                <p className={styles.error}>
                  {errors.membershipPlanId.message}
                </p>
              )}
            </div>{' '}
            <div className={styles.field}>
              <label className={styles.label}>Payment Method</label>
              <select
                {...register('paymentMethod', {
                  required: 'Payment method is required',
                })}
                className={styles.input}
                disabled={isLoading}
              >
                {paymentMethods.map((method) => (
                  <option key={method.value} value={method.value}>
                    {method.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dates */}
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
                onChange={handleStartDateChange}
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
                disabled
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
