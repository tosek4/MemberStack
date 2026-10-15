import { api } from '@/services/api'
import { SettingsData } from '../types'

export const getSettings = async (): Promise<SettingsData> => {
  const { data } = await api.get<SettingsData>('/settings')

  return data
}

export const updateSettings = async (
  settings: SettingsData,
): Promise<SettingsData> => {
  const { data } = await api.put<SettingsData>(
    '/settings',
    settings,
  )

  return data
}