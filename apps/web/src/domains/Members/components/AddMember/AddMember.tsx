'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { AddMemberFormData } from './types'
import { styles } from './AddMember.styled'

export const AddMember: React.FC = () => {
  const router = useRouter()

  const [form, setForm] = useState<AddMemberFormData>({
    name: '',
    email: '',
    phone: '',
    plan: '',
    startDate: '',
    endDate: '',
  })

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log('Create member:', form)

    router.push('/members')
  }

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header.wrapper}>
          <h1 className={styles.header.title}>Add member</h1>

          <p className={styles.header.subtitle}>
            Create a new member and assign their membership.
          </p>
        </div>

        <div className={styles.card}>
          <form
            className={styles.form.root}
            onSubmit={handleSubmit}
          >
            <div className={styles.form.grid}>
              <div className={styles.form.field}>
                <label
                  htmlFor="name"
                  className={styles.form.label}
                >
                  Full name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={styles.form.input}
                  required
                />
              </div>

              <div className={styles.form.field}>
                <label
                  htmlFor="email"
                  className={styles.form.label}
                >
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
                <label
                  htmlFor="phone"
                  className={styles.form.label}
                >
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
                <label
                  htmlFor="plan"
                  className={styles.form.label}
                >
                  Membership plan
                </label>

                <select
                  id="plan"
                  name="plan"
                  value={form.plan}
                  onChange={handleChange}
                  className={styles.form.select}
                  required
                >
                  <option value="">Select a plan</option>
                  <option value="basic">Basic</option>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                </select>
              </div>

              <div className={styles.form.field}>
                <label
                  htmlFor="startDate"
                  className={styles.form.label}
                >
                  Start date
                </label>

                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={form.startDate}
                  onChange={handleChange}
                  className={styles.form.input}
                  required
                />
              </div>

              <div className={styles.form.field}>
                <label
                  htmlFor="endDate"
                  className={styles.form.label}
                >
                  End date
                </label>

                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={form.endDate}
                  onChange={handleChange}
                  className={styles.form.input}
                  required
                />
              </div>
            </div>

            <div className={styles.actions.wrapper}>
              <button
                type="button"
                className={styles.actions.cancel}
                onClick={() => router.push('/members')}
              >
                Cancel
              </button>

              <button
                type="submit"
                className={styles.actions.submit}
              >
                Create member
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}