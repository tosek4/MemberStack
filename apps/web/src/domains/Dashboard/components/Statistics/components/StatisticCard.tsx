import React from 'react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'

import { styles } from './StatisticCard.styled'
import { StatisticCardProps } from '../types'

export const StatisticCard: React.FC<StatisticCardProps> = ({
  title,
  value,
  description,
  trend,
  trendPositive,
  icon: Icon,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <div className={styles.icon}>
            <Icon size={17} />
          </div>

          <span className={styles.title}>{title}</span>
        </div>
      </div>

      <div className={styles.value}>{value}</div>

      <div className={styles.footer}>
        {trend && (
          <span
            className={
              trendPositive ? styles.trend.positive : styles.trend.negative
            }
          >
            {trendPositive ? (
              <ArrowUpRight size={14} />
            ) : (
              <ArrowDownRight size={14} />
            )}

            {trend}
          </span>
        )}

        <span className={styles.description}>{description}</span>
      </div>

      <div className={styles.glow} />
    </div>
  )
}
