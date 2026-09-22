import {
  Activity,
  Clock3,
  CreditCard,
  TrendingUp,
  UserCheck,
  Users,
} from 'lucide-react'

import { DashboardOverview } from '../types'
import { Statistic } from '../components/Statistics/types'

export const getDashboardStatistics = (
  overview: DashboardOverview,
): Statistic[] => [
  {
    title: 'Members',
    value: overview.totalMembers,
    description: 'total members',
    trendPositive: true,
    icon: Users,
  },
  {
    title: 'Active',
    value: overview.activeMembers,
    description: 'of members',
    trendPositive: true,
    icon: UserCheck,
  },
  {
    title: 'Expiring',
    value: overview.expiringMembers,
    description: 'next 7 days',
    trendPositive: false,
    icon: Clock3,
  },
  {
    title: 'Attendance',
    value: overview.todayAttendance,
    description: 'today',
    trendPositive: true,
    icon: Activity,
  },
  {
    title: 'Today revenue',
    value: `€${overview.todayRevenue.toLocaleString()}`,
    description: 'today',
    trendPositive: true,
    icon: CreditCard,
  },
  {
    title: 'Monthly revenue',
    value: `€${overview.monthlyRevenue.toLocaleString()}`,
    description: 'this month',
    trendPositive: true,
    icon: TrendingUp,
  },
]
