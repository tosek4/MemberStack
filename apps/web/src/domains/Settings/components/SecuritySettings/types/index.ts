import { SecuritySettings } from '../../../types'

export interface SecuritySettingsProps {
  settings: SecuritySettings
  onChange: (settings: SecuritySettings) => void
  onChangePassword?: () => void
}