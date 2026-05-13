import { Entity, model, property } from '@loopback/repository'

@model()
export class Payment extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number

  @property({
    type: 'string',
    required: true,
  })
  memberSubscriptionId: string

  @property({
    type: 'number',
  })
  amount?: number

  @property({
    type: 'enum',
    required: true,
    members: ['cash', 'card', 'bank_transfer', 'paypal', 'other'],
  })
  paymentMethod: string

  @property({
    type: 'timestamp',
  })
  paidAt?: string

  @property({
    type: 'string',
  })
  transactionReference?: string

  @property({
    type: 'string',
  })
  createdByUserId?: string

  constructor(data?: Partial<Payment>) {
    super(data)
  }
}

export interface PaymentRelations {
  // describe navigational properties here
}

export type PaymentWithRelations = Payment & PaymentRelations
