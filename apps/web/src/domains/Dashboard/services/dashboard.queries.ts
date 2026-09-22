import { useQuery } from '@tanstack/react-query'
import { dashboardService } from './dashboard.service'

export const dashboardKeys = {
  all: ['dashboard'] as const,

  overview: () => [...dashboardKeys.all, 'overview'] as const,

  memberActivity: (period: string) =>
    [...dashboardKeys.all, 'memberActivity', period] as const,

  attendance: (month: string) =>
    [...dashboardKeys.all, 'attendance', month] as const,

  expiringMembers: () => [...dashboardKeys.all, 'expiringMembers'] as const,

  recentPayments: () => [...dashboardKeys.all, 'recentPayments'] as const,
}

export const useDashboardOverview = () => {
  return useQuery({
    queryKey: dashboardKeys.overview(),
    queryFn: () => dashboardService.getDashboardOverview(),
  })
}

export const useDashboardMemberActivity = (period: string) => {
  return useQuery({
    queryKey: dashboardKeys.memberActivity(period),
    queryFn: () => dashboardService.getDashboardMembersActivity(period),
  })
}

export const useDashboardAttendance = (month: string) => {
  return useQuery({
    queryKey: dashboardKeys.attendance(month),
    queryFn: () => dashboardService.getDashboardAttendance(month),
  })
}

export const useDashboardExpiringMembers = () => {
  return useQuery({
    queryKey: dashboardKeys.expiringMembers(),
    queryFn: () => dashboardService.getDashboardExpiringMembers(),
  })
}

export const useDashboardRecentPayments = () => {
  return useQuery({
    queryKey: dashboardKeys.recentPayments(),
    queryFn: () => dashboardService.getDashboardRecentPayments(),
  })
}
