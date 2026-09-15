import React from 'react'
import { useForm } from 'react-hook-form'

import { MembershipPlanFormData, MembershipPlanFormProps } from './types'

import { styles } from './MembershipPlanForm.styled'

export const MembershipPlanForm: React.FC<MembershipPlanFormProps> = ({
  initialValues,
  loading = false,
  submitLabel,
  loadingLabel,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MembershipPlanFormData>({
    defaultValues: {
      name: initialValues?.name ?? '',
      price: initialValues?.price,
      durationDays: initialValues?.durationDays,
      description: initialValues?.description ?? '',
    },
  })

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label className={styles.label}>Plan name</label>

        <input
          {...register('name', {
            required: 'Plan name is required',
          })}
          className={styles.input}
          placeholder="e.g. Premium"
        />

        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
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
          type="submit"
          disabled={loading}
          className={styles.submitButton}
        >
          {loading ? loadingLabel : submitLabel}
        </button>
      </div>
    </form>
  )
}
