import { api } from '@/services/api'

import { CreateMemberPayload, Member, UpdateMemberData } from '../types'

export const membersService = {
  getAll: async (): Promise<Member[]> => {
    const response = await api.get('/members')

    return response.data
  },

  getById: async (id: number): Promise<Member> => {
    const response = await api.get(`/members/${id}`)

    return response.data
  },

  create: async (data: CreateMemberPayload): Promise<Member> => {
    const response = await api.post('/members', data)

    return response.data
  },

  update: async (id: number, data: UpdateMemberData): Promise<Member> => {
    const response = await api.patch(`/members/${id}`, data)

    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/members/${id}`)
  },
}
