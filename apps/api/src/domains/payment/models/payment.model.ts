import { belongsTo, Entity, model, property } from '@loopback/repository'
import { Member } from '../../member/models'
import { User } from '../../user/models'
import { MemberSubscription } from '../../member-subscription/models'
import { PaymentRelations } from '../types'

@model()
export class Payment extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number

  @property({
    type: 'number',
  })
  amount?: number

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['cash', 'card', 'bank_transfer', 'paypal', 'other'],
    },
  })
  paymentMethod: string

  @property({
    type: 'date',
    required: true,
  })
  paidAt?: Date

  @property({
    type: 'string',
  })
  transactionReference?: string

  // relations
  @belongsTo(() => Member)
  memberId: number

  @belongsTo(() => MemberSubscription)
  memberSubscriptionId: number

  @belongsTo(() => User, { name: 'createdBy' })
  createdByUserId: number

  constructor(data?: Partial<Payment>) {
    super(data)
  }
}

export type PaymentWithRelations = Payment & PaymentRelations
