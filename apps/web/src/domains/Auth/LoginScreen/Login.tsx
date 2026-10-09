import React from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { useAuth } from '@providers'

import { styles } from './Login.styled'
import { LoginFormData, LoginScreenProps } from './types'
import { LABELS } from './utils/labels'
import { getDefaultRoute } from '../utils'
import { getApiErrorMessage } from '@/utils/apiError'
import { notifications } from '@/utils/notifications'

export const Login: React.FC<LoginScreenProps> = ({ title = LABELS.title }) => {
  const router = useRouter()
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login({
        email: data.email.trim(),
        password: data.password,
        remember: data.remember,
      })

      const role = response.user.role?.name

      if (!role) {
        throw new Error('User role not found')
      }

      const defaultRoute = getDefaultRoute(role)

      await router.push(defaultRoute)
    } catch (error) {
      const message = getApiErrorMessage(error)

      if (message) {
        notifications.error(message)
      }
    }
  }

  const handleForgotPassword = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    router.push('/forgot-password')
  }

  const handleSignUp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    router.push('/register')
  }

  return (
    <section className={styles.layout.section}>
      <div className={styles.layout.container}>
        <div className={styles.card.root}>
          <div className={styles.card.body}>
            <h1 className={styles.heading.title}>{title}</h1>

            <form
              className={styles.form.root}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={styles.form.field}>
                <label htmlFor="email" className={styles.form.label}>
                  {LABELS.email}
                </label>

                <input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                  })}
                  className={styles.form.input}
                  placeholder="name@company.com"
                  disabled={isSubmitting}
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
                  id="password"
                  type="password"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  className={styles.form.input}
                  placeholder="••••••••"
                  disabled={isSubmitting}
                />

                {errors.password && (
                  <p className={styles.form.error}>{errors.password.message}</p>
                )}
              </div>

              <div className={styles.options.row}>
                <div className={styles.options.remember.wrapper}>
                  <div className={styles.options.remember.checkboxWrapper}>
                    <input
                      id="remember"
                      type="checkbox"
                      {...register('remember')}
                      className={styles.options.remember.checkbox}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className={styles.options.remember.labelWrapper}>
                    <label
                      htmlFor="remember"
                      className={styles.options.remember.label}
                    >
                      {LABELS.rememberMe}
                    </label>
                  </div>
                </div>

                <a
                  href="#"
                  className={styles.options.forgotLink}
                  onClick={handleForgotPassword}
                >
                  {LABELS.forgotPassword}?
                </a>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submit.button}
              >
                {isSubmitting ? LABELS.signingIn : LABELS.signIn}
              </button>

              {/* <p className={styles.signup.text}>
                {LABELS.dontHaveAccount}{' '}
                <a
                  href="#"
                  className={styles.signup.link}
                  onClick={handleSignUp}
                >
                  {LABELS.signUp}
                </a>
              </p> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
