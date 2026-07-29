import { Entity, hasMany, model, property } from '@loopback/repository'
import {
  MemberSubscription,
  MemberSubscriptionWithRelations,
} from '../../member-subscription/models'
import { MemberPlanRelations } from '../types'

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
    type: 'date',
    defaultFn: 'now',
    required: true,
  })
  createdAt: Date

  // relations
  @hasMany(() => MemberSubscription, { keyTo: 'membershipPlanId' })
  subscriptions?: MemberSubscription[]

  constructor(data?: Partial<MemberPlan>) {
    super(data)
  }
}

export type MemberPlanWithRelations = MemberPlan & MemberPlanRelations
