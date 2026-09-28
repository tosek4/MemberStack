import React from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

import { styles } from './ForgotPassword.styled'
import { ForgotPasswordProps } from './types'
import { LABELS } from './utils/labels'

type ForgotPasswordFormData = {
  email: string
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  title = LABELS.title,
  loading = false,
  onSubmit,
  onBackToLogin,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
    },
  })

  const isPending = loading || isSubmitting

  const onSubmitForm = async (data: ForgotPasswordFormData) => {
    await onSubmit?.(data.email.trim())
  }

  const handleBackToLogin = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onBackToLogin?.()
  }

  return (
    <section className={styles.layout.section}>
      <div className={styles.layout.container}>
        <div className={styles.card.root}>
          <div className={styles.card.body}>
            <div>
              <h1 className={styles.heading.title}>{title}</h1>

              <p className={styles.heading.description}>{LABELS.description}</p>
            </div>

            <form
              className={styles.form.root}
              onSubmit={handleSubmit(onSubmitForm)}
            >
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

              <button
                type="submit"
                disabled={isPending}
                className={styles.submit.button}
              >
                {isPending ? LABELS.sending : LABELS.submit}
              </button>

              <div className={styles.back.wrapper}>
                <Link
                  href="/login/"
                  className={styles.back.link}
                  onClick={handleBackToLogin}
                >
                  {LABELS.backToLogin}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
