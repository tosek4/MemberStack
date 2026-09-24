import React from 'react'
import {Smartphone, ArrowRight} from 'lucide-react'

import {styles} from './MobileApp.styled'

export const MobileApp: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.icon}>
          <Smartphone size={30} />
        </div>

        <p className={styles.eyebrow}>
          MEMBERSTACK MOBILE
        </p>

        <h2 className={styles.title}>
          Your gym in your pocket.
        </h2>

        <p className={styles.description}>
          Manage your membership, keep track of your
          activity and stay connected with your gym
          wherever you go.
        </p>

        <button type="button" className={styles.button}>
          Download Mobile App
          <ArrowRight size={18} />
        </button>

        <p className={styles.comingSoon}>
          Available soon for iOS and Android
        </p>
      </div>
    </section>
  )
}