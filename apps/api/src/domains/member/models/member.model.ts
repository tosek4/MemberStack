import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository'
import { User } from '../../user/models'
import { Attendance } from '../../attendance/models'
import { Payment } from '../../payment/models'
import { MemberSubscription } from '../../member-subscription/models'
import { MemberRelations } from '../types'
import { MemberStatus } from '../types/member-status'

@model()
export class Member extends Entity {
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
  firstName: string

  @property({
    type: 'string',
    required: true,
  })
  lastName: string

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    },
  })
  email: string

  @property({
    type: 'string',
  })
  phone?: string

  @property({
    type: 'date',
    required: true,
  })
  birthDate: string

  @property({
    type: 'string',
  })
  gender?: string

  @property({
    type: 'string',
  })
  emergency_contact?: string

  @property({
    type: 'string',
  })
  profile_image?: string

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(MemberStatus),
    },
  })
  status: MemberStatus

  // relations
  @belongsTo(() => User, { name: 'createdBy' })
  createdByUserId: number

  @hasMany(() => Attendance)
  attendances?: Attendance[]

  @hasMany(() => Payment)
  payments?: Payment[]

  @hasMany(() => MemberSubscription)
  subscriptions?: MemberSubscription[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any

  constructor(data?: Partial<Member>) {
    super(data)
  }
}

export type MemberWithRelations = Member & MemberRelations
