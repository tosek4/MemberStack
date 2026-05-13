import { Entity, model, property } from '@loopback/repository'

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
  createdAt: string

  constructor(data?: Partial<MemberPlan>) {
    super(data)
  }
}

export interface MemberPlanRelations {
  // describe navigational properties here
}

export type MemberPlanWithRelations = MemberPlan & MemberPlanRelations
