import { SubscriptionStatusFilter } from '../../../types'
import { LABELS } from '../../../utils/labels'

export const statusOptions: {
  value: SubscriptionStatusFilter
  label: string
}[] = [
  { value: 'all', label: LABELS.all },
  { value: 'active', label: LABELS.active },
  { value: 'inactive', label: LABELS.inactive },
  { value: 'expired', label: LABELS.expired },
  { value: 'suspended', label: LABELS.suspended },
  { value: 'blocked', label: LABELS.blocked },
]
