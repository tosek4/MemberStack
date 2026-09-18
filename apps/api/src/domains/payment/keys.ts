import { BindingKey } from '@loopback/core'
import { PaymentService } from './service'

export const PAYMENT_SERVICE =
  BindingKey.create<PaymentService>('service.payment')
