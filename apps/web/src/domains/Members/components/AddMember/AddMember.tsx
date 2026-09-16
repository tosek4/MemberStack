'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { useCreateMember } from '../../services'
import { AddMemberFormData } from './types'
import { styles } from './AddMember.styled'

export const AddMember: React.FC = () => {
  const router = useRouter()

  const createMember = useCreateMember()

  const [form, setForm] = useState<AddMemberFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    gender: '',
  })

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    createMember.mutate(
      {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone || undefined,
        birthDate: new Date(`${form.birthDate}T00:00:00.000Z`).toISOString(),
        gender: form.gender || undefined,
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
          <form className={styles.form.root} onSubmit={handleSubmit}>
            <div className={styles.form.grid}>
              <div className={styles.form.field}>
                <label htmlFor="firstName" className={styles.form.label}>
                  First name
                </label>

                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className={styles.form.input}
                  required
                />
              </div>

              <div className={styles.form.field}>
                <label htmlFor="lastName" className={styles.form.label}>
                  Last name
                </label>

                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className={styles.form.input}
                  required
                />
              </div>

              <div className={styles.form.field}>
                <label htmlFor="email" className={styles.form.label}>
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={styles.form.input}
                  required
                />
              </div>

              <div className={styles.form.field}>
                <label htmlFor="phone" className={styles.form.label}>
                  Phone
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+389 70 123 456"
                  className={styles.form.input}
                />
              </div>

              <div className={styles.form.field}>
                <label htmlFor="birthDate" className={styles.form.label}>
                  Birth date
                </label>

                <input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={form.birthDate}
                  onChange={handleChange}
                  className={styles.form.input}
                  required
                />
              </div>

              <div className={styles.form.field}>
                <label htmlFor="gender" className={styles.form.label}>
                  Gender
                </label>

                <select
                  id="gender"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className={styles.form.select}
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
                disabled={createMember.isPending}
              >
                Cancel
              </button>

              <button
                type="submit"
                className={styles.actions.submit}
                disabled={createMember.isPending}
              >
                {createMember.isPending ? 'Creating...' : 'Create member'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
