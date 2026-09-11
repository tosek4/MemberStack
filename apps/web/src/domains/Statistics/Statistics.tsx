import React from 'react'
import { StatisticsProps } from './types'
import { styles } from './Statistics.styled'

export const Statistics: React.FC<StatisticsProps> = ({ statistics }) => {
  return (
    <div className={styles.grid}>
      {statistics.map((statistic) => (
        <div key={statistic.title} className={styles.card.root}>
          <div className={styles.card.header}>
            <h3 className={styles.card.title}>{statistic.title}</h3>
          </div>

          <p className={styles.card.value}>
            {statistic.value.toLocaleString()}
          </p>

          <p className={styles.card.description}>
            {statistic.trend && (
              <span
                className={`${styles.card.trend} ${
                  statistic.trendPositive
                    ? styles.card.trendPositive
                    : styles.card.trendNegative
                }`}
              >
                {statistic.trend}
              </span>
            )}{' '}
            {statistic.description}
          </p>
        </div>
      ))}
    </div>
  )
}
