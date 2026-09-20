import { api } from '@/services/api'

import {
  CreateMemberPayload,
  Member,
  MemberFilters,
  UpdateMemberData,
} from '../types'

export const membersService = {
  getAll: async (filters?: MemberFilters): Promise<Member[]> => {
    const params = new URLSearchParams()

    if (filters?.search?.trim()) {
      params.set('search', filters.search.trim())
    }

    if (filters?.status && filters.status !== 'all') {
      params.set('status', filters.status)
    }

    const query = params.toString()

    const response = await api.get<Member[]>(
      `/members${query ? `?${query}` : ''}`,
    )

    return response.data
  },

  getById: async (id: number): Promise<Member> => {
    const response = await api.get<Member>(`/members/${id}`)

    return response.data
  },

  create: async (data: CreateMemberPayload): Promise<Member> => {
    const response = await api.post<Member>('/members', data)

    return response.data
  },

  update: async (id: number, data: UpdateMemberData): Promise<Member> => {
    const response = await api.patch<Member>(`/members/${id}`, data)

    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/members/${id}`)
  },
}
