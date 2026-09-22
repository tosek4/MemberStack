import { LucideIcon } from 'lucide-react'

export interface StatisticItem {
  title: string
  value: number
  description: string
  trend?: string
  trendPositive?: boolean
}

export interface StatisticCardProps {
  title: string
  value: string | number
  description: string
  trend?: string
  trendPositive?: boolean
  icon: LucideIcon
}

export interface Statistic {
  title: string
  value: string | number
  description: string
  trend?: string
  trendPositive?: boolean
  icon: LucideIcon
}

export interface StatisticsProps {
  statistics?: Statistic[]
}
