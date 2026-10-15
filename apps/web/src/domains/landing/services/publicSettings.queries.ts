import { useQuery } from '@tanstack/react-query'

import { publicSettingsService } from './publicSettings.service'

export const publicSettingsKeys = {
  all: ['public-settings'] as const,
}

export const membershipPlanKeys = {
  all: ['membership-plans/public'] as const,

  lists: () => [...membershipPlanKeys.all, 'list'] as const,
}

export const usePublicSettings = () =>
  useQuery({
    queryKey: publicSettingsKeys.all,
    queryFn: publicSettingsService.getSettings,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })

export const usePublicMembershipPlans = () => {
  return useQuery({
    queryKey: membershipPlanKeys.lists(),
    queryFn: publicSettingsService.getMembershipPlans,
  })
}
