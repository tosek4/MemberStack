import React, { useState } from 'react'
import { styles } from './Register.styled'
import { RegisterScreenProps } from './types'
import { LABELS } from './utils/labels'

export const Register: React.FC<RegisterScreenProps> = ({
  title = LABELS.title,
  onSubmit,
  onSignIn,
  loading = false,
}) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (onSubmit) {
      await onSubmit({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        termsAccepted,
      })
    }
  }

  const handleSignIn = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    onSignIn?.()
  }

  return (
    <section className={styles.layout.section}>
      <div className={styles.layout.container}>
        <div className={styles.card.root}>
          <div className={styles.card.body}>
            <h1 className={styles.heading.title}>{title}</h1>

            <form className={styles.form.root} onSubmit={handleSubmit}>
              <div className={styles.form.row}>
                <div className={styles.form.field}>
                  <label htmlFor="firstName" className={styles.form.label}>
                    {LABELS.firstName}
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className={styles.form.input}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.form.field}>
                  <label htmlFor="lastName" className={styles.form.label}>
                    {LABELS.lastName}
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className={styles.form.input}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className={styles.form.field}>
                <label htmlFor="confirmPassword" className={styles.form.label}>
                  {LABELS.confirmPassword}
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className={styles.form.input}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className={styles.terms.wrapper}>
                <input
                  id="terms"
                  type="checkbox"
                  className={styles.terms.checkbox}
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  required
                />

                <label htmlFor="terms" className={styles.terms.label}>
                  {LABELS.terms}
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || !termsAccepted}
                className={styles.submit.button}
              >
                {loading ? LABELS.creatingAccount : LABELS.createAccount}
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
