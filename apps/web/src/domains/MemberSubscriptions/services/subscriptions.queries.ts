import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { subscriptionsService } from './subscriptions.service'
import {
  CreateSubscriptionPayload,
  SubscriptionFilters,
  UpdateSubscriptionPayload,
} from '../types'

export const subscriptionKeys = {
  all: ['subscriptions'] as const,

  lists: () => [...subscriptionKeys.all, 'list'] as const,

  list: (filters: SubscriptionFilters) =>
    [...subscriptionKeys.lists(), filters] as const,

  detail: (id: number) => [...subscriptionKeys.all, 'detail', id] as const,
}

export const useSubscriptions = (filters?: SubscriptionFilters) => {
  return useQuery({
    queryKey: subscriptionKeys.list(filters ?? {}),
    queryFn: () => subscriptionsService.getSubscriptions(filters),
    placeholderData: keepPreviousData,
  })
}

export const useSubscription = (id: number) => {
  return useQuery({
    queryKey: subscriptionKeys.detail(id),
    queryFn: () => subscriptionsService.getSubscriptionById(id),
    enabled: Number.isFinite(id),
  })
}

export const useCreateSubscription = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateSubscriptionPayload) =>
      subscriptionsService.createSubscription(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: subscriptionKeys.all,
      })
    },
  })
}

export const useUpdateSubscription = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number
      data: UpdateSubscriptionPayload
    }) => subscriptionsService.updateSubscription(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: subscriptionKeys.lists(),
      })

      queryClient.invalidateQueries({
        queryKey: subscriptionKeys.detail(variables.id),
      })
    },
  })
}

export const useDeleteSubscription = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: subscriptionsService.deleteSubscription,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: subscriptionKeys.all,
      })
    },
  })
}
