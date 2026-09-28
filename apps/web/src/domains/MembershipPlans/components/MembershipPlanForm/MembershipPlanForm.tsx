import React from 'react'
import { useRouter } from 'next/router'

import { MembershipPlanFormData, MembershipPlanFormProps } from './types'
import { styles } from './MembershipPlanForm.styled'

import {
  useCreateMembershipPlan,
  useUpdateMembershipPlan,
} from '../../services'
import { useForm } from 'react-hook-form'

export const MembershipPlanForm: React.FC<MembershipPlanFormProps> = ({
  initialValues,
  planId,
}) => {
  const router = useRouter()
  const isEdit = planId !== undefined

  const createMembershipPlan = useCreateMembershipPlan()
  const updateMembershipPlan = useUpdateMembershipPlan()

  const isPending =
    createMembershipPlan.isPending || updateMembershipPlan.isPending

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MembershipPlanFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      name: initialValues?.name ?? '',
      price: initialValues?.price,
      duration: initialValues?.duration,
      description: initialValues?.description ?? '',
      status: initialValues?.status ?? 'active',
      isDailyPlan: initialValues?.isDailyPlan ?? false,
    },
  })

  const onSubmit = (data: MembershipPlanFormData) => {
    const formattedData = {
      name: data.name.trim(),
      price: data.price,
      duration: data.duration,
      description: data.description.trim() || undefined,
      status: data.status,
      isDailyPlan: data.isDailyPlan,
    }

    if (isEdit) {
      updateMembershipPlan.mutate(
        {
          id: planId,
          data: formattedData,
        },
        {
          onSuccess: () => {
            router.push('/membershipPlans')
          },
        },
      )

      return
    }

    createMembershipPlan.mutate(formattedData, {
      onSuccess: () => {
        router.push('/membershipPlans')
      },
    })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label htmlFor="plan-name" className={styles.label}>
          Plan name
        </label>

        <input
          id="plan-name"
          {...register('name', {
            required: 'Plan name is required',
          })}
          className={styles.input}
          placeholder="Plan name"
          disabled={isPending}
        />

        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="plan-price" className={styles.label}>
            Price (€)
          </label>

          <input
            id="plan-price"
            {...register('price', {
              valueAsNumber: true,
              required: 'Price is required',
            })}
            type="number"
            className={styles.input}
            placeholder="40"
            disabled={isPending}
          />

          {errors.price && (
            <p className={styles.error}>{errors.price.message}</p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="plan-duration" className={styles.label}>
            Duration (days)
          </label>

          <input
            id="plan-duration"
            {...register('duration', {
              valueAsNumber: true,
              required: 'Duration is required',
            })}
            type="number"
            className={styles.input}
            placeholder="30"
            disabled={isPending}
          />

          {errors.duration && (
            <p className={styles.error}>{errors.duration.message}</p>
          )}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="plan-status" className={styles.label}>
            Status
          </label>

          <select
            id="plan-status"
            {...register('status', {
              required: 'Status is required',
            })}
            className={styles.input}
            disabled={isPending}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="plan-isDailyPlan" className={styles.label}>
            Is Daily Plan?
          </label>

          <select
            id="plan-isDailyPlan"
            {...register('isDailyPlan', {
              required: 'Is Daily Plan is required',
            })}
            className={styles.input}
            disabled={isPending}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="plan-description" className={styles.label}>
          Description
        </label>

        <textarea
          id="plan-description"
          {...register('description', {
            required: 'Description is required',
          })}
          className={styles.textarea}
          placeholder="Describe what this plan includes..."
          rows={4}
          disabled={isPending}
        />

        {errors.description && (
          <p className={styles.error}>{errors.description.message}</p>
        )}
      </div>

      <div className={styles.actions}>
        <button
          type="submit"
          disabled={isPending}
          className={styles.submitButton}
        >
          {isPending
            ? isEdit
              ? 'Updating...'
              : 'Creating...'
            : isEdit
              ? 'Update plan'
              : 'Create plan'}
        </button>
      </div>
    </form>
  )
}
