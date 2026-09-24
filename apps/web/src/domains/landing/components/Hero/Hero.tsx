import React from 'react'
import { ArrowRight, Lock } from 'lucide-react'

import { styles } from './Hero.styled'
import Link from 'next/link'

export const Hero: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.background} />

      <header className={styles.header}>
        <div className={styles.logo}>
          MEMBER<span>STACK</span>
        </div>

        <Link href="/login" className={styles.loginButton}>
          <Lock size={14} />
          Staff Login
        </Link>
      </header>

      <div className={styles.content}>
        <p className={styles.eyebrow}>YOUR FITNESS. YOUR JOURNEY.</p>

        <h1 className={styles.title}>
          Train harder.
          <br />
          Live stronger.
        </h1>

        <p className={styles.description}>
          Everything you need for your fitness journey. Track your membership,
          stay active and reach your goals.
        </p>

        <div className={styles.actions}>
          <button type="button" className={styles.primaryButton}>
            Download Mobile App
            <ArrowRight size={18} />
          </button>
        </div>

        <p className={styles.comingSoon}>Mobile app coming soon</p>
      </div>
    </section>
  )
}
