import { Entity, hasMany, model, property } from '@loopback/repository'
import {
  MemberSubscription,
  MemberSubscriptionWithRelations,
} from '../../member-subscription/models'
import { MemberPlanRelations, MemberPlanStatus } from '../types'

@model()
export class MemberPlan extends Entity {
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
  name: string

  @property({
    type: 'string',
  })
  description?: string

  @property({
    type: 'number',
    required: true,
    jsonSchema: {
      minimum: 0,
    },
  })
  price: number

  @property({
    type: 'number',
    required: true,
    jsonSchema: {
      minimum: 1,
    },
  })
  duration: number

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(MemberPlanStatus),
    },
  })
  status: MemberPlanStatus

  @property({
    type: 'date',
    defaultFn: 'now',
    required: true,
  })
  createdAt: Date

  @property({
    type: 'boolean',
    required: true,
    default: false,
  })
  isDailyPlan: boolean

  // relations
  @hasMany(() => MemberSubscription, { keyTo: 'membershipPlanId' })
  subscriptions?: MemberSubscription[]

  constructor(data?: Partial<MemberPlan>) {
    super(data)
  }
}

export type MemberPlanWithRelations = MemberPlan & MemberPlanRelations
