import React from 'react'

import { styles } from './About.styled'
import { features } from './utils'

export const About: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>WHY CHOOSE US</p>

          <h2 className={styles.title}>
            More than a gym.
            <br />A place to become stronger.
          </h2>

          <p className={styles.description}>
            Whether you&apos;re starting your fitness journey or pushing toward
            your next personal record, we&apos;ve created a place where you can
            focus on becoming your best.
          </p>
        </div>

        <div className={styles.features}>
          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <div key={feature.title} className={styles.card}>
                <div className={styles.icon}>
                  <Icon size={24} />
                </div>

                <h3 className={styles.cardTitle}>{feature.title}</h3>

                <p className={styles.cardDescription}>{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
