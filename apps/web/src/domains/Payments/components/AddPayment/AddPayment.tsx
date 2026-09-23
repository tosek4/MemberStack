import React, { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { useMembers } from '@/domains/Members/services'
import { useMembershipPlans } from '@/domains/MembershipPlans/services'

import type {
  AddPaymentFormData,
  PaymentMethod,
  PaymentStatus,
} from '../../types'

import {
  PAYMENT_METHOD_LABELS,
  PAYMENT_STATUS_LABELS,
} from '../../utils/labels'

import { styles } from './AddPayment.styled'
import { useCreatePayment } from '../../services'
import { useRouter } from 'next/router'
import { getCurrentDate } from '@/utils/dateFormat'

export const AddPayment: React.FC = () => {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null)

  const createPayment = useCreatePayment()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddPaymentFormData>({
    defaultValues: {
      amount: 0,
      paymentMethod: 'cash',
      status: 'paid',
      paymentDate: getCurrentDate(),
      transactionReference: '',
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

  const selectedPlanId = watch('memberSubscriptionId')

  const selectedMember = useMemo(() => {
    return members.find((member) => member.id === selectedMemberId)
  }, [members, selectedMemberId])

  const selectedPlan = useMemo(() => {
    return membershipPlans.find(
      (plan) => String(plan.id) === String(selectedPlanId),
    )
  }, [membershipPlans, selectedPlanId])

  const filteredMembers = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim()

    if (!normalizedSearch) {
      return members
    }

    return members.filter((member) => {
      const fullName = `${member.firstName} ${member.lastName}`.toLowerCase()

      return (
        fullName.includes(normalizedSearch) ||
        member.email.toLowerCase().includes(normalizedSearch) ||
        member.phone?.toLowerCase().includes(normalizedSearch)
      )
    })
  }, [members, search])

  const activePlans = useMemo(() => {
    return membershipPlans.filter((plan) => plan.status === 'active')
  }, [membershipPlans])

  const handleMemberChange = (memberId: number) => {
    const member = members.find((item) => item.id === memberId)

    setSelectedMemberId(memberId)

    setValue('memberId', memberId, {
      shouldValidate: true,
    })

    const activePlanId = member?.latestSubscription?.membershipPlan?.id

    if (activePlanId) {
      handlePlanChange(String(activePlanId))
    } else {
      setValue('memberSubscriptionId', 0, {
        shouldValidate: true,
      })

      setValue('amount', 0, {
        shouldValidate: true,
      })
    }
  }

  const handlePlanChange = (planId: string) => {
    setValue('memberSubscriptionId', Number(planId), {
      shouldValidate: true,
    })

    const plan = membershipPlans.find((item) => String(item.id) === planId)

    setValue('amount', plan?.price ?? 0, {
      shouldValidate: true,
    })
  }

  const submit = async (data: AddPaymentFormData) => {
    createPayment.mutate(
      {
        amount: data.amount,
        paymentMethod: data.paymentMethod,
        paidAt: data.paymentDate,
        status: data.status,
        memberId: Number(data.memberId),
        memberSubscriptionId: Number(data.memberSubscriptionId),
        transactionReference: data.transactionReference || undefined,
      },
      {
        onSuccess: () => {
          router.push('/payments')
        },
      },
    )
  }

  const isLoading = membersLoading || plansLoading || createPayment.isPending

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.header.title}>Add Payment</h2>

        <p className={styles.header.description}>
          Record a payment and create or renew the member subscription.
        </p>
      </div>

      <form onSubmit={handleSubmit(submit)} className={styles.form}>
        {/* Member */}
        <div className={styles.field.wrapper}>
          <label className={styles.field.label}>Member</label>

          <div className={styles.searchWrapper}>
            <Search size={18} className={styles.searchIcon} />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, email or phone..."
              className={styles.searchInput}
              disabled={isLoading || membersError}
            />
          </div>

          <div className={styles.memberList}>
            {membersLoading && (
              <div className={styles.emptyState}>Loading members...</div>
            )}

            {membersError && (
              <div className={styles.emptyState}>Failed to load members.</div>
            )}

            {!membersLoading &&
              !membersError &&
              filteredMembers.length === 0 && (
                <div className={styles.emptyState}>No members found.</div>
              )}

            {!membersLoading &&
              !membersError &&
              filteredMembers.map((member) => {
                const isSelected = member.id === selectedMemberId

                return (
                  <button
                    key={member.id}
                    type="button"
                    className={`${styles.memberOption} ${
                      isSelected ? styles.memberOptionSelected : ''
                    }`}
                    onClick={() => handleMemberChange(member.id)}
                    disabled={isLoading}
                  >
                    <div className={styles.memberInfo}>
                      <span className={styles.memberName}>
                        {member.firstName} {member.lastName}
                      </span>

                      <span className={styles.memberEmail}>{member.email}</span>

                      {member.phone && (
                        <span className={styles.memberPhone}>
                          {member.phone}
                        </span>
                      )}
                    </div>

                    {member.latestSubscription && (
                      <span className={styles.memberPlan}>
                        {member?.latestSubscription?.membershipPlan?.name}
                      </span>
                    )}
                  </button>
                )
              })}
          </div>

          <input
            type="hidden"
            {...register('memberId', {
              required: 'Member is required',
            })}
          />

          {errors.memberId && (
            <span className={styles.field.error}>
              {errors.memberId.message}
            </span>
          )}
        </div>

        <div className={styles.field.wrapper}>
          <label className={styles.field.label}>Membership Plan</label>
          <select
            {...register('memberSubscriptionId', {
              required: 'Membership plan is required',
            })}
            value={selectedPlanId}
            onChange={(event) => handlePlanChange(event.target.value)}
            disabled={!selectedMember || isLoading}
            className={styles.field.select}
          >
            <option value="">
              {!selectedMember
                ? 'Select member first'
                : plansLoading
                  ? 'Loading plans...'
                  : 'Select membership plan'}
            </option>

            {activePlans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name} — €{plan.price.toFixed(2)} / {plan.duration} days
              </option>
            ))}
          </select>
          {selectedMember?.latestSubscription && (
            <div className={styles.currentSubscription}>
              <div>
                <span className={styles.currentSubscriptionLabel}>
                  Current subscription
                </span>

                <span className={styles.currentSubscriptionPlan}>
                  {selectedMember.latestSubscription?.membershipPlan?.name}
                </span>
              </div>

              <div className={styles.currentSubscriptionDate}>
                Valid until{' '}
                {new Date(
                  selectedMember.latestSubscription.expiresAt,
                ).toLocaleDateString('en-GB')}
              </div>
            </div>
          )}
          {plansError && (
            <span className={styles.field.error}>
              Failed to load membership plans.
            </span>
          )}
          {errors.memberSubscriptionId && (
            <span className={styles.field.error}>
              {errors.memberSubscriptionId.message}
            </span>
          )}
        </div>
        {selectedPlan && (
          <div className={`${styles.subscription} ${styles.field.full}`}>
            <div className={styles.subscriptionHeader}>
              Selected Membership Plan
            </div>

            <div className={styles.subscriptionDetails}>
              <div>
                <span className={styles.subscriptionLabel}>Plan</span>

                <span className={styles.subscriptionValue}>
                  {selectedPlan.name}
                </span>
              </div>

              <div>
                <span className={styles.subscriptionLabel}>Price</span>

                <span className={styles.subscriptionValue}>
                  €{selectedPlan.price.toFixed(2)}
                </span>
              </div>

              <div>
                <span className={styles.subscriptionLabel}>Duration</span>

                <span className={styles.subscriptionValue}>
                  {selectedPlan.duration} days
                </span>
              </div>

              {selectedPlan.description && (
                <div>
                  <span className={styles.subscriptionLabel}>Description</span>

                  <span className={styles.subscriptionValue}>
                    {selectedPlan.description}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
        <div className={styles.field.wrapper}>
          <label className={styles.field.label}>Amount</label>

          <input
            type="number"
            step="0.01"
            min="0"
            readOnly
            {...register('amount', {
              required: 'Amount is required',
              valueAsNumber: true,
              min: {
                value: 0.01,
                message: 'Amount must be greater than 0',
              },
            })}
            className={`${styles.field.input} ${styles.field.readOnly}`}
          />

          {errors.amount && (
            <span className={styles.field.error}>{errors.amount.message}</span>
          )}
        </div>

        <div className={styles.field.wrapper}>
          <label className={styles.field.label}>Payment Method</label>

          <select
            {...register('paymentMethod')}
            className={styles.field.select}
          >
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
          <label className={styles.field.label}>Transaction Reference</label>

          <input
            type="text"
            {...register('transactionReference')}
            placeholder="Optional transaction or receipt reference"
            className={styles.field.input}
          />
        </div>
        <div className={`${styles.field.full} ${styles.actions}`}>
          <button
            type="button"
            className={styles.cancel}
            onClick={() => window.history.back()}
            disabled={isLoading}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isLoading || !selectedMember || !selectedPlan}
            className={styles.submit}
          >
            {isLoading ? 'Saving...' : 'Add Payment'}
          </button>
        </div>
      </form>
    </div>
  )
}
