import { MembershipSettings } from '../../../types'

export interface MembershipSettingsProps {
  settings: MembershipSettings
  onChange: (settings: MembershipSettings) => void
}