import { service } from '@loopback/core'
import { api, get, response } from '@loopback/rest'
import { SettingsService } from '../service'
import { PublicSettings } from '../types'

@api({ basePath: '/settings/public' })
export class PublicSettingsController {
  constructor(
    @service(SettingsService) private settingsService: SettingsService,
  ) {}

  @get('/')
  @response(200, {
    description: 'Public gym details for the landing page',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          required: ['gymName', 'email', 'phone', 'address', 'currency'],
          properties: {
            gymName: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' },
            address: { type: 'string' },
            currency: { type: 'string' },
          },
        },
      },
    },
  })
  getPublicSettings(): Promise<PublicSettings> {
    return this.settingsService.getPublicSettings()
  }
}
