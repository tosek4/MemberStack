import { GeneralSettings } from '../../../types'

export interface GeneralSettingsProps {
  settings: GeneralSettings
  onChange: (settings: GeneralSettings) => void
}