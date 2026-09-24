import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { X } from 'lucide-react'

import { styles } from './DailyCheckIn.styled'
import type { DailyCheckInFormData, DailyCheckInProps } from './types'
import { useMembershipPlans } from '@/domains/MembershipPlans/services'

export const DailyCheckIn: React.FC<DailyCheckInProps> = ({
  open,
  loading = false,
  onClose,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DailyCheckInFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      membershipPlanId: undefined,
      paymentMethod: 'cash',
    },
  })

  const { data: plans = [], isLoading: plansLoading } = useMembershipPlans()

  const dailyPlans = plans.filter(
    (plan) => plan.isDailyPlan && plan.status === 'active',
  )

  useEffect(() => {
    if (!open) {
      return
    }

    const firstDailyPlan = plans.find(
      (plan) => plan.isDailyPlan && plan.status === 'active',
    )

    reset({
      firstName: '',
      lastName: '',
      phone: '',
      membershipPlanId: firstDailyPlan?.id,
      paymentMethod: 'cash',
    })
  }, [open, plans, reset])

  if (!open) {
    return null
  }

  const handleFormSubmit = (data: DailyCheckInFormData) => {
    onSubmit(data)
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Daily Check In</h2>

            <p className={styles.description}>
              Register a daily visitor and record their payment.
            </p>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            disabled={loading}
          >
            <X size={20} />
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>First name</label>

              <input
                {...register('firstName', {
                  required: 'First name is required',
                })}
                className={styles.input}
                placeholder="Enter first name"
                disabled={loading}
              />

              {errors.firstName && (
                <p className={styles.error}>{errors.firstName.message}</p>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Last name</label>

              <input
                {...register('lastName', {
                  required: 'Last name is required',
                })}
                className={styles.input}
                placeholder="Enter last name"
                disabled={loading}
              />

              {errors.lastName && (
                <p className={styles.error}>{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Phone</label>

            <input
              {...register('phone')}
              className={styles.input}
              placeholder="Enter phone number"
              disabled={loading}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Daily Plan</label>

            <select
              {...register('membershipPlanId', {
                required: 'Daily plan is required',
                valueAsNumber: true,
              })}
              className={styles.input}
              disabled={loading || plansLoading}
            >
              <option value="">
                {plansLoading ? 'Loading plans...' : 'Select daily plan'}
              </option>

              {dailyPlans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name} - €{plan.price}
                </option>
              ))}
            </select>

            {errors.membershipPlanId && (
              <p className={styles.error}>{errors.membershipPlanId.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Payment Method</label>

            <select
              {...register('paymentMethod')}
              className={styles.input}
              disabled={loading}
            >
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="paypal">PayPal</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading || plansLoading || dailyPlans.length === 0}
            >
              {loading ? 'Checking In...' : 'Check In & Pay'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
