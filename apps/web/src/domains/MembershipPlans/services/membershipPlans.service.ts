import { api } from '@/services/api'

import {
  CreateMembershipPlanPayload,
  MembershipPlan,
  UpdateMembershipPlanData,
} from '../types'

export const membershipPlansService = {
  getAll: async (): Promise<MembershipPlan[]> => {
    const response = await api.get('/member-plans')

    return response.data
  },

  getById: async (id: number): Promise<MembershipPlan> => {
    const response = await api.get(`/member-plans/${id}`)

    return response.data
  },

  create: async (
    data: CreateMembershipPlanPayload,
  ): Promise<MembershipPlan> => {
    const response = await api.post('/member-plans', data)

    return response.data
  },

  update: async (
    id: number,
    data: UpdateMembershipPlanData,
  ): Promise<MembershipPlan> => {
    const response = await api.patch(`/member-plans/${id}`, data)

    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/member-plans/${id}`)
  },
}
