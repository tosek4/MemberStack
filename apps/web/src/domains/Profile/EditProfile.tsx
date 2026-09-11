import React, { useState } from 'react'

import { styles } from './EditProfile.styled'
import { EditProfileProps } from './types'
import { LABELS } from './utils/labels'

export const EditProfile: React.FC<EditProfileProps> = ({
  initialData,
  loading = false,
  onSubmit,
}) => {
  const [formData, setFormData] = useState(initialData)

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    if (onSubmit) {
      await onSubmit(formData)
    }
  }

  return (
    <div className={styles.card.root}>
      <div className={styles.card.body}>
        <div>
          <h1 className={styles.heading.title}>
            {LABELS.title}
          </h1>

          <p className={styles.heading.description}>
            Update your personal information.
          </p>
        </div>

        <form
          className={styles.form.root}
          onSubmit={handleSubmit}
        >
          <div className={styles.form.grid}>
            <div className={styles.form.field}>
              <label
                htmlFor="firstName"
                className={styles.form.label}
              >
                {LABELS.firstName}
              </label>

              <input
                type="text"
                id="firstName"
                name="firstName"
                className={styles.form.input}
                placeholder={LABELS.firstNamePlaceholder}
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.form.field}>
              <label
                htmlFor="lastName"
                className={styles.form.label}
              >
                {LABELS.lastName}
              </label>

              <input
                type="text"
                id="lastName"
                name="lastName"
                className={styles.form.input}
                placeholder={LABELS.lastNamePlaceholder}
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.form.field}>
            <label
              htmlFor="email"
              className={styles.form.label}
            >
              {LABELS.email}
            </label>

            <input
              type="email"
              id="email"
              name="email"
              className={styles.form.input}
              placeholder={LABELS.emailPlaceholder}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.submit.wrapper}>
            <button
              type="submit"
              disabled={loading}
              className={styles.submit.button}
            >
              {loading ? LABELS.saving : LABELS.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}