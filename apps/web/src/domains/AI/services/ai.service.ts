import { api } from '@/services/api'
import { AIAskRequest, AIAskResponse } from '../types'

export const aiService = {
  ask: async (question: string): Promise<AIAskResponse> => {
    const response = await api.post<AIAskResponse>('/ai/ask', {
      question,
    } satisfies AIAskRequest)

    return response.data
  },
}
