export type PaymentMethod =
  | 'cash'
  | 'card'
  | 'bank_transfer'
  | 'paypal'
  | 'other'

export interface PaymentMethodModalProps {
  open: boolean
  onClose: () => void
  onConfirm: (paymentMethod: PaymentMethod) => void
  loading?: boolean
}
