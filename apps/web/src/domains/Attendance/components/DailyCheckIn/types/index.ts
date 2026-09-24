import { PaymentMethod } from '@/components/PaymentMethodModal/types'

export interface DailyCheckInFormData {
  firstName: string
  lastName: string
  phone: string
  membershipPlanId: number
  paymentMethod: PaymentMethod
}

export interface DailyCheckInProps {
  open: boolean
  loading?: boolean
  onClose: () => void
  onSubmit: (data: DailyCheckInFormData) => void
}
