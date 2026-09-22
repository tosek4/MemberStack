import { MemberStatusFilter } from '../../../types'

export const statusOptions: {
  value: MemberStatusFilter
  label: string
}[] = [
  {
    value: 'all',
    label: 'All members',
  },
  {
    value: 'active',
    label: 'Active',
  },
  {
    value: 'expiring',
    label: 'Expiring soon',
  },
  {
    value: 'expired',
    label: 'Expired',
  },
  {
    value: 'noSubscription',
    label: 'No subscription',
  },
]
