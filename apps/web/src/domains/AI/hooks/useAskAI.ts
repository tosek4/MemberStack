import { useMutation } from '@tanstack/react-query'
import { aiService } from '../services/ai.service'

export const useAskAI = () => {
  return useMutation({
    mutationFn: (question: string) => aiService.ask(question),
  })
}
