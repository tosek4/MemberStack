import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository'

import { MemberPlan } from '../../member-plan/models/member-plan.model'
import { User } from '../../user/models/user.model'
import { Attendance } from '../../attendance/models'

@model()
export class DailyVisit extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number

  @property({
    type: 'string',
    required: true,
  })
  firstName: string

  @property({
    type: 'string',
    required: true,
  })
  lastName: string

  @property({
    type: 'string',
  })
  phone?: string

  @property({
    type: 'date',
    required: true,
  })
  visitDate: Date

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['checked_in', 'checked_out', 'cancelled'],
    },
  })
  status: string

  @property({
    type: 'date',
    required: true,
  })
  checkedInAt: Date

  @property({
    type: 'date',
  })
  checkedOutAt?: Date

  @property({
    type: 'date',
    defaultFn: 'now',
    required: true,
  })
  createdAt: Date

  //relations
  @belongsTo(() => MemberPlan)
  membershipPlanId: number

  @belongsTo(() => User, { name: 'createdBy' })
  createdByUserId: number

  @hasMany(() => Attendance)
  attendances?: Attendance[]

  constructor(data?: Partial<DailyVisit>) {
    super(data)
  }
}
