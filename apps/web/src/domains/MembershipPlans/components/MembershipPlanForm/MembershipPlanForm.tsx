import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { MembershipPlanFormData, MembershipPlanFormProps } from './types'
import { styles } from './MembershipPlanForm.styled'

import {
  useCreateMembershipPlan,
  useUpdateMembershipPlan,
} from '../../services'

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

  const [form, setForm] = useState<MembershipPlanFormData>({
    name: initialValues?.name ?? '',
    price: initialValues?.price ?? 0,
    duration: initialValues?.duration ?? 0,
    description: initialValues?.description ?? '',
    status: initialValues?.status ?? 'active',
    isDailyPlan: initialValues?.isDailyPlan ?? false,
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target

    if (name === 'price' || name === 'duration') {
      setForm((prev) => ({
        ...prev,
        [name]: Number(value),
      }))

      return
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = {
      name: form.name.trim(),
      price: form.price,
      duration: form.duration,
      description: form.description.trim() || undefined,
      status: form.status,
      isDailyPlan: form.isDailyPlan,
    }

    if (isEdit) {
      updateMembershipPlan.mutate(
        {
          id: planId,
          data,
        },
        {
          onSuccess: () => {
            router.push('/membershipPlans')
          },
        },
      )

      return
    }

    createMembershipPlan.mutate(data, {
      onSuccess: () => {
        router.push('/membershipPlans')
      },
    })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="plan-name" className={styles.label}>
          Plan name
        </label>

        <input
          id="plan-name"
          name="name"
          value={form.name}
          onChange={handleChange}
          className={styles.input}
          placeholder="e.g. Premium"
          disabled={isPending}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="plan-price" className={styles.label}>
            Price (€)
          </label>

          <input
            id="plan-price"
            name="price"
            onChange={handleChange}
            value={form.price}
            type="number"
            min="0"
            step="0.01"
            className={styles.input}
            placeholder="40"
            disabled={isPending}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="plan-duration" className={styles.label}>
            Duration (days)
          </label>

          <input
            id="plan-duration"
            name="duration"
            onChange={handleChange}
            value={form.duration}
            type="number"
            min="1"
            className={styles.input}
            placeholder="30"
            disabled={isPending}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="plan-status" className={styles.label}>
            Status
          </label>

          <select
            id="plan-status"
            name="status"
            value={form.status}
            onChange={handleChange}
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
            name="isDailyPlan"
            value={form.isDailyPlan ? 'true' : 'false'}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                isDailyPlan: e.target.value === 'true',
              }))
            }
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
          name="description"
          value={form.description}
          onChange={handleChange}
          className={styles.textarea}
          placeholder="Describe what this plan includes..."
          rows={4}
          disabled={isPending}
        />
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
