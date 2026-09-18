import { api } from '@/services/api'

import { CreatePaymentPayload, Payment, UpdatePaymentPayload } from '../types'

export const paymentsService = {
  getAll: async (): Promise<Payment[]> => {
    const response = await api.get('/payments')

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
