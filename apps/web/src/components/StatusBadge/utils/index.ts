import { styles } from '../StatusBadge.styled'

export const statusStyles = {
  active: styles.active,
  inactive: styles.inactive,
  pending: styles.pending,
  expired: styles.expired,
  expiring: styles.expiring,
  suspended: styles.suspended,
  blocked: styles.blocked,
  noSubscription: styles.noSubscription,
} as const
