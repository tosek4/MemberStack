import { api } from '@/services'
import {
  CreateSubscriptionPayload,
  MemberSubscription,
  SubscriptionFilters,
  UpdateSubscriptionPayload,
} from '../types'

export const subscriptionsService = {
  getSubscriptions: async (
    filters?: SubscriptionFilters,
  ): Promise<MemberSubscription[]> => {
    const params = new URLSearchParams()

    if (filters?.search?.trim()) {
      params.set('search', filters.search.trim())
    }

    if (filters?.status && filters.status !== 'all') {
      params.set('status', filters.status)
    }

    const query = params.toString()

    const response = await api.get<MemberSubscription[]>(
      `/member-subscriptions${query ? `?${query}` : ''}`,
    )

    return response.data
  },

  getSubscriptionById: async (id: number): Promise<MemberSubscription> => {
    const response = await api.get<MemberSubscription>(
      `/member-subscriptions/${id}`,
    )

    return response.data
  },

  createSubscription: async (
    data: CreateSubscriptionPayload,
  ): Promise<MemberSubscription> => {
    const response = await api.post<MemberSubscription>(
      '/member-subscriptions',
      data,
    )

    return response.data
  },

  updateSubscription: async (
    id: number,
    data: UpdateSubscriptionPayload,
  ): Promise<MemberSubscription> => {
    const response = await api.patch<MemberSubscription>(
      `/member-subscriptions/${id}`,
      data,
    )

    return response.data
  },

  deleteSubscription: async (id: number): Promise<void> => {
    await api.delete(`/member-subscriptions/${id}`)
  },
}
