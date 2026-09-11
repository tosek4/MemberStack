export interface StatisticItem {
  title: string
  value: number
  description: string
  trend?: string
  trendPositive?: boolean
}

export interface StatisticsProps {
  statistics: StatisticItem[]
}
