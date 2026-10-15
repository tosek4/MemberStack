import { BindingScope, injectable } from '@loopback/core'
import { repository } from '@loopback/repository'
import { HttpErrors } from '@loopback/rest'
import { Settings } from '../models'
import { SettingsRepository } from '../repositories'
import { PublicSettings, SettingsData } from '../types'
import { DEFAULT_SETTINGS, SETTINGS_ID } from '../utils'


@injectable({ scope: BindingScope.TRANSIENT })
export class SettingsService {
  constructor(
    @repository(SettingsRepository)
    private settingsRepository: SettingsRepository,
  ) {}

  async getSettings(): Promise<SettingsData> {
    const settings = await this.getOrCreateSettings()
    return this.toSettingsData(settings)
  }

  async getPublicSettings(): Promise<PublicSettings> {
    const settings = await this.getOrCreateSettings()
    return {
      gymName: settings.gymName,
      email: settings.email,
      phone: settings.phone,
      address: settings.address,
      currency: settings.currency,
    }
  }

  async updateSettings(data: SettingsData): Promise<SettingsData> {
    this.validateSettings(data)
    const current = await this.getOrCreateSettings()

    await this.settingsRepository.updateById(SETTINGS_ID, {
      gymName: data.general.gymName.trim(),
      email: data.general.email.trim(),
      phone: data.general.phone.trim(),
      address: data.general.address.trim(),
      currency: data.general.currency,
      defaultDuration: data.membership.defaultDuration,
      expiringSoonDays: data.membership.expiringSoonDays,
      gracePeriodDays: data.membership.gracePeriodDays,
      sessionTimeout: data.security.sessionTimeout,
      createdAt: current.createdAt,
      updatedAt: new Date(),
    })

    return this.getSettings()
  }

  private async getOrCreateSettings(): Promise<Settings> {
    try {
      return await this.settingsRepository.findById(SETTINGS_ID)
    } catch (error) {
      // Only initialize when the singleton row is missing. Other database
      // failures should not be hidden as a successful default response.
      const statusCode = (error as { statusCode?: number }).statusCode
      if (statusCode !== 404) throw error
    }

    const defaults = DEFAULT_SETTINGS
    try {
      return await this.settingsRepository.create({
        id: SETTINGS_ID,
        gymName: defaults.general.gymName,
        email: defaults.general.email,
        phone: defaults.general.phone,
        address: defaults.general.address,
        currency: defaults.general.currency,
        defaultDuration: defaults.membership.defaultDuration,
        expiringSoonDays: defaults.membership.expiringSoonDays,
        gracePeriodDays: defaults.membership.gracePeriodDays,
        sessionTimeout: defaults.security.sessionTimeout,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    } catch {
      // A concurrent request may have inserted the singleton first.
      return this.settingsRepository.findById(SETTINGS_ID)
    }
  }

  private toSettingsData(settings: Settings): SettingsData {
    return {
      general: {
        gymName: settings.gymName,
        email: settings.email,
        phone: settings.phone,
        address: settings.address,
        currency: settings.currency,
      },
      membership: {
        defaultDuration: settings.defaultDuration,
        expiringSoonDays: settings.expiringSoonDays,
        gracePeriodDays: settings.gracePeriodDays,
      },
      security: { sessionTimeout: settings.sessionTimeout },
    }
  }

  private validateSettings(data: SettingsData): void {
    if (!data || !data.general || !data.membership || !data.security) {
      throw new HttpErrors.BadRequest('All settings sections are required')
    }

    const requiredStrings = [
      data.general.gymName,
      data.general.email,
      data.general.phone,
      data.general.address,
    ]
    if (requiredStrings.some((value) => typeof value !== 'string' || !value.trim())) {
      throw new HttpErrors.BadRequest('General settings fields cannot be empty')
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.general.email.trim())) {
      throw new HttpErrors.BadRequest('A valid contact email is required')
    }
    if (!['EUR', 'USD', 'GBP', 'MKD'].includes(data.general.currency)) {
      throw new HttpErrors.BadRequest('Currency must be EUR, USD, GBP or MKD')
    }

    const integerInRange = (value: number, min: number, max: number) =>
      Number.isInteger(value) && value >= min && value <= max
    if (!integerInRange(data.membership.defaultDuration, 1, 36)) {
      throw new HttpErrors.BadRequest('Default duration must be between 1 and 36 months')
    }
    if (!integerInRange(data.membership.expiringSoonDays, 0, 365)) {
      throw new HttpErrors.BadRequest('Expiring-soon days must be between 0 and 365')
    }
    if (!integerInRange(data.membership.gracePeriodDays, 0, 365)) {
      throw new HttpErrors.BadRequest('Grace period must be between 0 and 365 days')
    }
    if (!integerInRange(data.security.sessionTimeout, 5, 1440)) {
      throw new HttpErrors.BadRequest('Session timeout must be between 5 and 1440 minutes')
    }
  }
}
