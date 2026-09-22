import { api } from '@/services'
import {
  DashboardOverview,
  DashboardMemberActivity,
  DashboardAttendance,
  DashboardExpiringMember,
  DashboardRecentPayment,
} from '../types'

export const dashboardService = {
  getDashboardOverview: async (): Promise<DashboardOverview> => {
    const response = await api.get<DashboardOverview>(`/dashboard/overview`)

    return response.data
  },

  getDashboardMembersActivity: async (
    period: string,
  ): Promise<DashboardMemberActivity[]> => {
    const response = await api.get<DashboardMemberActivity[]>(
      '/dashboard/membersActivity',
      { params: { period } },
    )

    return response.data
  },

  getDashboardAttendance: async (
    month: string,
  ): Promise<DashboardAttendance[]> => {
    const response = await api.get<DashboardAttendance[]>(
      '/dashboard/attendance',
      {
        params: {
          month,
        },
      },
    )

    return response.data
  },

  getDashboardExpiringMembers: async (): Promise<DashboardExpiringMember[]> => {
    const response = await api.get<DashboardExpiringMember[]>(
      '/dashboard/expiringMembers',
    )

    return response.data
  },

  getDashboardRecentPayments: async (): Promise<DashboardRecentPayment[]> => {
    const response = await api.get<DashboardRecentPayment[]>(
      '/dashboard/recentPayments',
    )

    return response.data
  },
}
