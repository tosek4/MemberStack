import { Payment } from '@/domains/Payments/types'

export interface PaymentCardProps {
  payment: Payment
  onView?: (payment: Payment) => void
}
