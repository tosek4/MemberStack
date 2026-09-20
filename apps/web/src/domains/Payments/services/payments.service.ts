import { api } from '@/services/api'

import {
  CreatePaymentPayload,
  Payment,
  PaymentFilters,
  UpdatePaymentPayload,
} from '../types'

export const paymentsService = {
  getAll: async (filters?: PaymentFilters): Promise<Payment[]> => {
    const params = new URLSearchParams()

    if (filters?.search?.trim()) {
      params.set('search', filters.search.trim())
    }

    if (filters?.method && filters.method !== 'all') {
      params.set('method', filters.method)
    }

    if (filters?.status && filters.status !== 'all') {
      params.set('status', filters.status)
    }

    const query = params.toString()

    const response = await api.get<Payment[]>(
      `/payments${query ? `?${query}` : ''}`,
    )

    return response.data
  },

  getById: async (id: number): Promise<Payment> => {
    const response = await api.get(`/payments/${id}`)

    return response.data
  },

  create: async (data: CreatePaymentPayload): Promise<Payment> => {
    console.log('data', data)
    const response = await api.post('/payments', data)

    return response.data
  },

  update: async (id: number, data: UpdatePaymentPayload): Promise<Payment> => {
    const response = await api.patch(`/payments/${id}`, data)

    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/payments/${id}`)
  },
}
