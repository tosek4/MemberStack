import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { styles } from './EditProfile.styled'
import { EditProfileFormData, EditProfileProps } from './types'
import { LABELS } from './utils/labels'

export const EditProfile: React.FC<EditProfileProps> = ({
  initialData,
  loading = false,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: initialData,
  })

  useEffect(() => {
    reset(initialData)
  }, [initialData, reset])

  const isPending = loading || isSubmitting

  const onSubmitForm = async (data: EditProfileFormData) => {
    if (!onSubmit) {
      return
    }

    await onSubmit({
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
    })
  }

  return (
    <div className={styles.card.root}>
      <div className={styles.card.body}>
        <div>
          <h1 className={styles.heading.title}>{LABELS.title}</h1>

          <p className={styles.heading.description}>
            Update your personal information.
          </p>
        </div>

        <form
          className={styles.form.root}
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <div className={styles.form.grid}>
            <div className={styles.form.field}>
              <label htmlFor="firstName" className={styles.form.label}>
                {LABELS.firstName}
              </label>

              <input
                type="text"
                id="firstName"
                {...register('firstName', {
                  required: 'First name is required',
                })}
                className={styles.form.input}
                placeholder={LABELS.firstNamePlaceholder}
                disabled={isPending}
              />

              {errors.firstName && (
                <p className={styles.form.error}>{errors.firstName.message}</p>
              )}
            </div>

            <div className={styles.form.field}>
              <label htmlFor="lastName" className={styles.form.label}>
                {LABELS.lastName}
              </label>

              <input
                type="text"
                id="lastName"
                {...register('lastName', {
                  required: 'Last name is required',
                })}
                className={styles.form.input}
                placeholder={LABELS.lastNamePlaceholder}
                disabled={isPending}
              />

              {errors.lastName && (
                <p className={styles.form.error}>{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className={styles.form.field}>
            <label htmlFor="email" className={styles.form.label}>
              {LABELS.email}
            </label>

            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
              })}
              className={styles.form.input}
              placeholder={LABELS.emailPlaceholder}
              disabled={isPending}
            />

            {errors.email && (
              <p className={styles.form.error}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.submit.wrapper}>
            <button
              type="submit"
              disabled={isPending}
              className={styles.submit.button}
            >
              {isPending ? LABELS.saving : LABELS.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
