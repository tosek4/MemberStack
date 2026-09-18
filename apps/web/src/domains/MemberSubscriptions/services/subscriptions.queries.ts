import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  createSubscription,
  deleteSubscription,
  getSubscriptionById,
  getSubscriptions,
  updateSubscription,
} from './subscriptions.service'
import { CreateSubscriptionPayload, UpdateSubscriptionPayload } from '../types'

export const useSubscriptions = () => {
  return useQuery({
    queryKey: ['subscriptions'],
    queryFn: getSubscriptions,
  })
}

export const useSubscription = (id: number) => {
  return useQuery({
    queryKey: ['subscription', id],
    queryFn: () => getSubscriptionById(id),
    enabled: Number.isFinite(id),
  })
}

export const useCreateSubscription = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateSubscriptionPayload) => 
      createSubscription(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['subscriptions'],
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
    }) => updateSubscription(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['subscriptions'],
      })

      queryClient.invalidateQueries({
        queryKey: ['subscription', variables.id],
      })
    },
  })
}

export const useDeleteSubscription = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteSubscription,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['subscriptions'],
      })
    },
  })
}
