import React from 'react'
import { useForm } from 'react-hook-form'

import { styles } from './Register.styled'
import { RegisterFormData, RegisterScreenProps } from './types'
import { LABELS } from './utils/labels'

export const Register: React.FC<RegisterScreenProps> = ({
  title = LABELS.title,
  onSubmit,
  onSignIn,
  loading = false,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    },
  })

  const termsAccepted = watch('termsAccepted')
  const isPending = loading || isSubmitting

  const onSubmitForm = async (data: RegisterFormData) => {
    await onSubmit?.({
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      password: data.password,
      confirmPassword: data.confirmPassword,
      termsAccepted: data.termsAccepted,
    })
  }

  const handleSignIn = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onSignIn?.()
  }

  return (
    <section className={styles.layout.section}>
      <div className={styles.layout.container}>
        <div className={styles.card.root}>
          <div className={styles.card.body}>
            <h1 className={styles.heading.title}>{title}</h1>

            <form
              className={styles.form.root}
              onSubmit={handleSubmit(onSubmitForm)}
            >
              <div className={styles.form.row}>
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
                    disabled={isPending}
                  />

                  {errors.firstName && (
                    <p className={styles.form.error}>
                      {errors.firstName.message}
                    </p>
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
                    disabled={isPending}
                  />

                  {errors.lastName && (
                    <p className={styles.form.error}>
                      {errors.lastName.message}
                    </p>
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
                  placeholder="name@company.com"
                  disabled={isPending}
                />

                {errors.email && (
                  <p className={styles.form.error}>{errors.email.message}</p>
                )}
              </div>

              <div className={styles.form.field}>
                <label htmlFor="password" className={styles.form.label}>
                  {LABELS.password}
                </label>

                <input
                  type="password"
                  id="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must contain at least 8 characters',
                    },
                  })}
                  className={styles.form.input}
                  disabled={isPending}
                />

                {errors.password && (
                  <p className={styles.form.error}>{errors.password.message}</p>
                )}
              </div>

              <div className={styles.form.field}>
                <label htmlFor="confirmPassword" className={styles.form.label}>
                  {LABELS.confirmPassword}
                </label>

                <input
                  type="password"
                  id="confirmPassword"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value, formValues) =>
                      value === formValues.password || 'Passwords do not match',
                  })}
                  className={styles.form.input}
                  disabled={isPending}
                />

                {errors.confirmPassword && (
                  <p className={styles.form.error}>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className={styles.terms.wrapper}>
                <input
                  id="terms"
                  type="checkbox"
                  className={styles.terms.checkbox}
                  {...register('termsAccepted', {
                    required: 'You must accept the terms',
                  })}
                  disabled={isPending}
                />

                <label htmlFor="terms" className={styles.terms.label}>
                  {LABELS.terms}
                </label>
              </div>

              {errors.termsAccepted && (
                <p className={styles.form.error}>
                  {errors.termsAccepted.message}
                </p>
              )}

              <button
                type="submit"
                disabled={isPending || !termsAccepted}
                className={styles.submit.button}
              >
                {isPending ? LABELS.creatingAccount : LABELS.createAccount}
              </button>

              <p className={styles.signin.text}>
                {LABELS.alreadyHaveAccount}{' '}
                <a
                  href="#"
                  className={styles.signin.link}
                  onClick={handleSignIn}
                >
                  {LABELS.signIn}
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
