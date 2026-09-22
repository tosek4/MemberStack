import React from 'react'

import { StatisticCard } from './components/StatisticCard'
import { styles } from './Statistics.styled'
import { StatisticsProps } from './types'

export const Statistics: React.FC<StatisticsProps> = ({ statistics }) => {
  return (
    <div className={styles.grid}>
      {statistics?.map((statistic) => (
        <StatisticCard key={statistic.title} {...statistic} />
      ))}
    </div>
  )
}
