import { inject } from '@loopback/core'
import { api, post, requestBody, response } from '@loopback/rest'
import { authenticate } from '@loopback/authentication'
import { authorize } from '@loopback/authorization'

import { AI_ASSISTANT_SERVICE } from '../keys'
import { AIAssistantService } from '../services/ai-assistant.service'
import { AIAskRequest, AIAskResponse } from '../types/ai-assistant.types'
import { AIAskRequestSchema, AIAskResponseSchema } from './ai-assistant.docs'
import { AppRole } from '../../../enums/app-role.enum'

@authenticate('jwt')
@authorize({
  allowedRoles: [
    AppRole.ADMIN,
    AppRole.SUPER_ADMIN,
    AppRole.RECEPTIONIST,
    AppRole.MANAGER,
    AppRole.TRAINER,
  ],
  voters: ['authorization.authorizers.role'],
})
@api({ basePath: '/ai' })
export class AIAssistantController {
  constructor(
    @inject(AI_ASSISTANT_SERVICE)
    private readonly aiAssistantService: AIAssistantService,
  ) {}

  @post('/ask')
  @response(200, AIAskResponseSchema)
  async ask(
    @requestBody(AIAskRequestSchema)
    body: AIAskRequest,
  ): Promise<AIAskResponse> {
    return this.aiAssistantService.ask(body.question)
  }
}
