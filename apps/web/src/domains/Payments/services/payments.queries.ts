import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { paymentsService } from './payments.service'
import {
  CreatePaymentPayload,
  PaymentFilters,
  UpdatePaymentPayload,
} from '../types'

export const PaymentKeys = {
  all: ['payments'] as const,

  lists: () => [...PaymentKeys.all, 'list'] as const,

  list: (filters: PaymentFilters) =>
    [...PaymentKeys.lists(), filters] as const,

  detail: (id: number) => [...PaymentKeys.all, 'detail', id] as const,
}

export const usePayments = (filters?: PaymentFilters) => {
  return useQuery({
    queryKey: PaymentKeys.list(filters ?? {}),
    queryFn: () => paymentsService.getAll(filters),
    placeholderData: keepPreviousData,
  })
}

export const usePayment = (id: number) => {
  return useQuery({
    queryKey: PaymentKeys.detail(id),
    queryFn: () => paymentsService.getById(id),
    enabled: Boolean(id),
  })
}

export const useCreatePayment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreatePaymentPayload) => paymentsService.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PaymentKeys.all,
      })
    },
  })
}

export const useUpdatePayment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePaymentPayload }) =>
      paymentsService.update(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: PaymentKeys.lists(),
      })

      queryClient.invalidateQueries({
        queryKey: PaymentKeys.detail(variables.id),
      })
    },
  })
}

export const useDeleteMembershipPlan = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: paymentsService.delete,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PaymentKeys.lists(),
      })
    },
  })
}
