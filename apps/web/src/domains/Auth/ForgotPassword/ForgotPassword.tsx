import React, { useState } from 'react'

import { styles } from './ForgotPassword.styled'
import { ForgotPasswordProps } from './types'
import { LABELS } from './utils/labels'
import Link from 'next/link'

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  title = LABELS.title,
  loading = false,
  onSubmit,
  onBackToLogin,
}) => {
  const [email, setEmail] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (onSubmit) {
      await onSubmit(email)
    }
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
                  placeholder={LABELS.emailPlaceholder}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={styles.submit.button}
              >
                {loading ? LABELS.sending : LABELS.submit}
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
