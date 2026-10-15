import { SettingsData } from '../types'

export const SETTINGS_ID = 1

export const DEFAULT_SETTINGS: SettingsData = {
  general: {
    gymName: 'MemberStack Gym',
    email: 'info@memberstack.com',
    phone: '+389 70 123 456',
    address: 'Skopje, North Macedonia',
    currency: 'EUR',
  },
  membership: {
    defaultDuration: 1,
    expiringSoonDays: 7,
    gracePeriodDays: 0,
  },
  security: { sessionTimeout: 60 },
}
