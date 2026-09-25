import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { useAuth } from '@providers'

import { styles } from './Login.styled'
import { LoginScreenProps } from './types'
import { LABELS } from './utils/labels'
import { getDefaultRoute } from '../utils'

export const Login: React.FC<LoginScreenProps> = ({ title = LABELS.title }) => {
  const router = useRouter()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setLoading(true)

      const response = await login({
        email,
        password,
        remember,
      })

      const role = response.user.role?.name

      if (!role) {
        throw new Error('User role not found')
      }

      const defaultRoute = getDefaultRoute(role)

      await router.push(defaultRoute)
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setLoading(false)
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

            <form className={styles.form.root} onSubmit={handleSubmit}>
              <div className={styles.form.field}>
                <label htmlFor="email" className={styles.form.label}>
                  {LABELS.email}
                </label>

                <input
                  type="email"
                  name="email"
                  id="email"
                  className={styles.form.input}
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className={styles.form.field}>
                <label htmlFor="password" className={styles.form.label}>
                  {LABELS.password}
                </label>

                <input
                  type="password"
                  name="password"
                  id="password"
                  className={styles.form.input}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className={styles.options.row}>
                <div className={styles.options.remember.wrapper}>
                  <div className={styles.options.remember.checkboxWrapper}>
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className={styles.options.remember.checkbox}
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
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
                disabled={loading}
                className={styles.submit.button}
              >
                {loading ? LABELS.signingIn : LABELS.signIn}
              </button>

              <p className={styles.signup.text}>
                {LABELS.dontHaveAccount}{' '}
                <a
                  href="#"
                  className={styles.signup.link}
                  onClick={handleSignUp}
                >
                  {LABELS.signUp}
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
