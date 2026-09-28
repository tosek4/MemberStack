'use client'

import React from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { useCreateMember } from '../../services'
import { AddMemberFormData } from './types'
import { styles } from './AddMember.styled'

export const AddMember: React.FC = () => {
  const router = useRouter()

  const createMember = useCreateMember()

  const isPending = createMember.isPending

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddMemberFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      birthDate: '',
      gender: '',
    },
  })

  const onSubmit = (data: AddMemberFormData) => {
    createMember.mutate(
      {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.trim(),
        phone: data.phone.trim() || undefined,
        birthDate: new Date(`${data.birthDate}T00:00:00.000Z`).toISOString(),
        gender: data.gender || undefined,
        status: 'active',
      },
      {
        onSuccess: () => {
          router.push('/members')
        },
      },
    )
  }

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header.wrapper}>
          <h1 className={styles.header.title}>Add member</h1>

          <p className={styles.header.subtitle}>Create a new member.</p>
        </div>

        <div className={styles.card}>
          <form className={styles.form.root} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.form.grid}>
              <div className={styles.form.field}>
                <label htmlFor="firstName" className={styles.form.label}>
                  First name
                </label>

                <input
                  id="firstName"
                  type="text"
                  {...register('firstName', {
                    required: 'First name is required',
                  })}
                  placeholder="John"
                  className={styles.form.input}
                  disabled={isPending}
                />

                {errors.firstName && (
                  <p className={styles.form.error}>{errors.firstName.message}</p>
                )}
              </div>

              <div className={styles.form.field}>
                <label htmlFor="lastName" className={styles.form.label}>
                  Last name
                </label>

                <input
                  id="lastName"
                  type="text"
                  {...register('lastName', {
                    required: 'Last name is required',
                  })}
                  placeholder="Doe"
                  className={styles.form.input}
                  disabled={isPending}
                />

                {errors.lastName && (
                  <p className={styles.form.error}>{errors.lastName.message}</p>
                )}
              </div>

              <div className={styles.form.field}>
                <label htmlFor="email" className={styles.form.label}>
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                  })}
                  placeholder="john@example.com"
                  className={styles.form.input}
                  disabled={isPending}
                />

                {errors.email && (
                  <p className={styles.form.error}>{errors.email.message}</p>
                )}
              </div>

              <div className={styles.form.field}>
                <label htmlFor="phone" className={styles.form.label}>
                  Phone
                </label>

                <input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  placeholder="+389 70 123 456"
                  className={styles.form.input}
                  disabled={isPending}
                />
              </div>

              <div className={styles.form.field}>
                <label htmlFor="birthDate" className={styles.form.label}>
                  Birth date
                </label>

                <input
                  id="birthDate"
                  type="date"
                  {...register('birthDate', {
                    required: 'Birth date is required',
                  })}
                  className={styles.form.input}
                  disabled={isPending}
                />

                {errors.birthDate && (
                  <p className={styles.form.error}>{errors.birthDate.message}</p>
                )}
              </div>

              <div className={styles.form.field}>
                <label htmlFor="gender" className={styles.form.label}>
                  Gender
                </label>

                <select
                  id="gender"
                  {...register('gender')}
                  className={styles.form.select}
                  disabled={isPending}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            {createMember.isError && (
              <p className={styles.error.text}>
                Failed to create member. Please check the information and try
                again.
              </p>
            )}

            <div className={styles.actions.wrapper}>
              <button
                type="button"
                className={styles.actions.cancel}
                onClick={() => router.push('/members')}
                disabled={isPending}
              >
                Cancel
              </button>

              <button
                type="submit"
                className={styles.actions.submit}
                disabled={isPending}
              >
                {isPending ? 'Creating...' : 'Create member'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
