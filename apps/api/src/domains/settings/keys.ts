import { BindingKey } from '@loopback/core'
import { SettingsService } from './service'

export const SETTINGS_SERVICE = BindingKey.create<SettingsService>(
  'service.settings',
)
