export type PaymentMethod = 'cash' | 'card' | 'bank-transfer'

export type PaymentStatus = 'paid' | 'pending' | 'failed' | 'refunded'

export interface Payment {
  id: string
  memberId: string
  memberName: string
  memberEmail: string

  memberSubscriptionId: string
  planName: string

  amount: number
  currency: string

  method: PaymentMethod
  status: PaymentStatus

  paymentDate: string
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
  memberId: string
  memberSubscriptionId: string
  amount: number
  method: PaymentMethod
  status: PaymentStatus
  paymentDate: string
  reference?: string
}

export interface AddPaymentProps {
  loading?: boolean
  onSubmit?: (data: AddPaymentFormData) => Promise<void> | void
}
