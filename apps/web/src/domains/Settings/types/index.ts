export interface GeneralSettings {
  gymName: string
  email: string
  phone: string
  address: string
  currency: string
}

export interface MembershipSettings {
  defaultDuration: number
  expiringSoonDays: number
  gracePeriodDays: number
}

export interface SecuritySettings {
  sessionTimeout: number
}

export interface SettingsData {
  general: GeneralSettings
  membership: MembershipSettings
  security: SecuritySettings
}
