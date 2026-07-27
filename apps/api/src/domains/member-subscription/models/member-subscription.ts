import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository'
import { Member } from '../../member/models'
import { MemberPlan } from '../../member-plan/models'
import { User } from '../../user/models'
import { Payment } from '../../payment/models'
import { MemberSubscriptionRelations } from '../types'

@model()
export class MemberSubscription extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number

  @property({
    type: 'date',
    required: true,
  })
  startedAt: string

  @property({
    type: 'date',
    required: true,
  })
  expiresAt: string

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['active', 'inactive', 'expired', 'suspended', 'blocked'],
    },
  })
  status?: string

  @property({
    type: 'number',
  })
  remainingVisits: number

  // relations
  @belongsTo(() => Member)
  memberId: number

  @belongsTo(() => MemberPlan)
  membershipPlanId: number

  @belongsTo(() => User, { name: 'createdBy' })
  createdByUserId: number

  @hasMany(() => Payment)
  payments?: Payment[]

  constructor(data?: Partial<MemberSubscription>) {
    super(data)
  }
}

export type MemberSubscriptionWithRelations = MemberSubscription &
  MemberSubscriptionRelations
