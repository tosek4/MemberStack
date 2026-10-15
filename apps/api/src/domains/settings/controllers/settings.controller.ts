import { service } from '@loopback/core'
import { authenticate } from '@loopback/authentication'
import { authorize } from '@loopback/authorization/dist/decorators/authorize'
import { api, get, put, requestBody, response } from '@loopback/rest'
import { AppRole } from '../../../enums/app-role.enum'
import { SettingsService } from '../service'
import { SettingsData } from '../types'
import { SettingsDataSchema, UpdateSettingsRequestSchema } from '../schemas'

@authenticate('jwt')
@api({ basePath: '/settings' })
@authorize({
  allowedRoles: [AppRole.ADMIN, AppRole.SUPER_ADMIN],
  voters: ['authorization.authorizers.role'],
})
export class SettingsController {
  constructor(
    @service(SettingsService) private settingsService: SettingsService,
  ) {}

  @get('/')
  @response(200, {
    description: 'Current gym settings',
    content: { 'application/json': { schema: SettingsDataSchema } },
  })
  getSettings(): Promise<SettingsData> {
    return this.settingsService.getSettings()
  }

  @put('/')
  @response(200, {
    description: 'Updated gym settings',
    content: { 'application/json': { schema: SettingsDataSchema } },
  })
  updateSettings(
    @requestBody(UpdateSettingsRequestSchema) data: SettingsData,
  ): Promise<SettingsData> {
    return this.settingsService.updateSettings(data)
  }
}
