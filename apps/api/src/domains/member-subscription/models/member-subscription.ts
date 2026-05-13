import { Entity, model, property } from '@loopback/repository'

@model()
export class MemberSubscription extends Entity {
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
  memberId: string

  @property({
    type: 'string',
    required: true,
  })
  membershipPlanId: string

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
    type: 'enum',
    required: true,
    members: ['active', 'inactive', 'expired', 'suspended', 'blocked'],
  })
  status?: string

  @property({
    type: 'number',
  })
  remainingVisits: number

  @property({
    type: 'string',
    required: true,
  })
  createdByUserId: string

  constructor(data?: Partial<MemberSubscription>) {
    super(data)
  }
}

export interface MemberSubscriptionRelations {
  // describe navigational properties here
}

export type MemberSubscriptionWithRelations = MemberSubscription &
  MemberSubscriptionRelations
