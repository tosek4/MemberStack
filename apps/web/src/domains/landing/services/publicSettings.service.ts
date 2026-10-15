import { api } from '@/services/api'
import { PublicMembershipPlan, PublicSettings } from '../types'

export const publicSettingsService = {
  getSettings: async (): Promise<PublicSettings> => {
    const { data } = await api.get<PublicSettings>('/settings/public')

    return data
  },

  getMembershipPlans: async (): Promise<PublicMembershipPlan[]> => {
    const response = await api.get<PublicMembershipPlan[]>(
      '/member-plans/public',
    )

    return response.data
  },
}
