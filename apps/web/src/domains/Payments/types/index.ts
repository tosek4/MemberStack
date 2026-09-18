export type PaymentMethod = 'cash' | 'card' | 'bank-transfer'

export type PaymentStatus = 'paid' | 'pending' | 'failed' | 'refunded'

export interface Payment {
  id: number
  memberId: number
  memberName: string
  memberEmail: string
  memberSubscriptionId: number
  planName: string
  amount: number
  currency: string
  method: string
  status: string
  paymentDate: Date
  reference?: string
}

export type PaymentMethodFilter = 'all' | PaymentMethod

export type PaymentStatusFilter = 'all' | PaymentStatus

export interface PaymentFiltersProps {
  search: string
  method: PaymentMethodFilter
  status: PaymentStatusFilter

  onSearchChange: (value: string) => void
  onMethodChange: (value: PaymentMethodFilter) => void
  onStatusChange: (value: PaymentStatusFilter) => void
}

export interface PaymentCardProps {
  payment: Payment
  onView?: (payment: Payment) => void
}

export interface AddPaymentFormData {
  memberId: number
  memberSubscriptionId: number
  amount: number
  paymentMethod: string
  status: string
  paymentDate: string
  transactionReference?: string
}

export interface CreatePaymentPayload {
  memberId: number
  memberSubscriptionId: number
  amount: number
  paymentMethod: string
  status: string
  paidAt: string
  transactionReference?: string
}
export interface UpdatePaymentPayload {
  memberId?: number
  memberSubscriptionId?: number
  amount?: number
  paymentMethod?: string
  status?: string
  paidAt?: string
  transactionReference?: string
}
