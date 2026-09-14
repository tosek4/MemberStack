import type { PaymentMethod, PaymentStatus } from '../types'

export const LABELS = {
  title: 'Payments',
  addPayment: 'Add Payment',

  searchPlaceholder: 'Search by member name or email...',

  totalRevenue: 'Total Revenue',
  thisMonth: 'This Month',
  paid: 'Paid',
  pending: 'Pending',

  allMethods: 'All Methods',
  allStatuses: 'All Statuses',

  cash: 'Cash',
  card: 'Card',
  bankTransfer: 'Bank Transfer',

  paidStatus: 'Paid',
  pendingStatus: 'Pending',
  failedStatus: 'Failed',
  refundedStatus: 'Refunded',

  member: 'Member',
  memberSubscription: 'Member Subscription',
  amount: 'Amount',
  method: 'Payment Method',
  status: 'Status',
  paymentDate: 'Payment Date',
  reference: 'Reference',

  view: 'View',
} as const

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  cash: LABELS.cash,
  card: LABELS.card,
  'bank-transfer': LABELS.bankTransfer,
}

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  paid: LABELS.paidStatus,
  pending: LABELS.pendingStatus,
  failed: LABELS.failedStatus,
  refunded: LABELS.refundedStatus,
}
