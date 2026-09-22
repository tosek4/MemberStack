import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { CreateMembershipPlanPayload, UpdateMembershipPlanData } from '../types'
import { membershipPlansService } from './membershipPlans.service'

export const membershipPlanKeys = {
  all: ['membership-plans'] as const,

  lists: () => [...membershipPlanKeys.all, 'list'] as const,

  detail: (id: number) => [...membershipPlanKeys.all, 'detail', id] as const,
}

export const useMembershipPlans = () => {
  return useQuery({
    queryKey: membershipPlanKeys.lists(),
    queryFn: membershipPlansService.getAll,
  })
}

export const useMembershipPlan = (id: number) => {
  return useQuery({
    queryKey: membershipPlanKeys.detail(id),
    queryFn: () => membershipPlansService.getById(id),
    enabled: Boolean(id),
  })
}

export const useCreateMembershipPlan = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateMembershipPlanPayload) =>
      membershipPlansService.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: membershipPlanKeys.all,
      })
    },
  })
}

export const useUpdateMembershipPlan = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number
      data: UpdateMembershipPlanData
    }) => membershipPlansService.update(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: membershipPlanKeys.lists(),
      })

      queryClient.invalidateQueries({
        queryKey: membershipPlanKeys.detail(variables.id),
      })
    },
  })
}

export const useDeleteMembershipPlan = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: membershipPlansService.delete,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: membershipPlanKeys.lists(),
      })
    },
  })
}
