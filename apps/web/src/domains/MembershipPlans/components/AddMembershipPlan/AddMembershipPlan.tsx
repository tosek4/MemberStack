import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { AddMembershipPlanFormData, AddMembershipPlanProps } from './types'

import { styles } from './AddMembershipPlan.styled'

export const AddMembershipPlan: React.FC<AddMembershipPlanProps> = ({
  loading = false,
  onSubmit,
}) => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddMembershipPlanFormData>()

  const submit = async (data: AddMembershipPlanFormData) => {
    await onSubmit?.(data)

    router.push('/membership-plans')
  }

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Add Membership Plan</h1>

          <p className={styles.subtitle}>
            Create a new membership plan for your members.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit(submit)}>
          <div className={styles.field}>
            <label className={styles.label}>Plan name</label>

            <input
              {...register('name', {
                required: 'Plan name is required',
              })}
              className={styles.input}
              placeholder="e.g. Premium"
            />

            {errors.name && (
              <p className={styles.error}>{errors.name.message}</p>
            )}
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Price (€)</label>

              <input
                type="number"
                step="0.01"
                {...register('price', {
                  required: 'Price is required',
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: 'Price cannot be negative',
                  },
                })}
                className={styles.input}
                placeholder="40"
              />

              {errors.price && (
                <p className={styles.error}>{errors.price.message}</p>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Duration (days)</label>

              <input
                type="number"
                {...register('durationDays', {
                  required: 'Duration is required',
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: 'Duration must be at least 1 day',
                  },
                })}
                className={styles.input}
                placeholder="30"
              />

              {errors.durationDays && (
                <p className={styles.error}>{errors.durationDays.message}</p>
              )}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Description</label>

            <textarea
              {...register('description')}
              className={styles.textarea}
              placeholder="Describe what this plan includes..."
              rows={4}
            />
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => router.push('/membership-plans')}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? 'Creating...' : 'Create plan'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
