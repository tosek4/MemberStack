import { BindingKey } from '@loopback/core'
import { AIAssistantService } from './services/ai-assistant.service'

export const AI_ASSISTANT_SERVICE = BindingKey.create<AIAssistantService>(
  'service.ai-assistant',
)
