import { api } from '@/services'
import {
  CreateSubscriptionPayload,
  MemberSubscription,
  UpdateSubscriptionPayload,
} from '../types'

export const getSubscriptions = async (): Promise<MemberSubscription[]> => {
  const response = await api.get<MemberSubscription[]>('/member-subscriptions')

  return response.data
}

export const getSubscriptionById = async (
  id: number,
): Promise<MemberSubscription> => {
  const response = await api.get<MemberSubscription>(
    `/member-subscriptions/${id}`,
  )

  return response.data
}

export const createSubscription = async (
  data: CreateSubscriptionPayload,
): Promise<MemberSubscription> => {
  const response = await api.post<MemberSubscription>(
    '/member-subscriptions',
    data,
  )

  return response.data
}

export const updateSubscription = async (
  id: number,
  data: UpdateSubscriptionPayload,
): Promise<MemberSubscription> => {
  const response = await api.patch<MemberSubscription>(
    `/member-subscriptions/${id}`,
    data,
  )

  return response.data
}

export const deleteSubscription = async (id: number): Promise<void> => {
  await api.delete(`/member-subscriptions/${id}`)
}
