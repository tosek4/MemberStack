import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository'
import { Role } from '../../role/models'
import { RefreshToken } from '../../refresh-token/models'
import { Member } from '../../member/models'
import { Payment } from '../../payment/models'
import { Attendance } from '../../attendance/models'
import { UserRelations } from '../types'

@model()
export class User extends Entity {
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
    required: true,
    index: {
      unique: true,
    },
  })
  email: string

  @property({
    type: 'string',
    required: true,
    hidden: true,
  })
  passwordHash: string

  @property({
    type: 'string',
  })
  phone?: string

  @property({
    type: 'boolean',
    required: true,
  })
  isActive: boolean

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  createdAt?: Date

  // relations
  @belongsTo(() => Role)
  roleId: number

  @hasMany(() => RefreshToken)
  refreshTokens?: RefreshToken[]

  @hasMany(() => Member, { keyTo: 'createdByUserId' })
  members?: Member[]

  @hasMany(() => Payment, { keyTo: 'createdByUserId' })
  payments?: Payment[]

  @hasMany(() => Attendance, { keyTo: 'createdByUserId' })
  attendances?: Attendance[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any

  constructor(data?: Partial<User>) {
    super(data)
  }
}

export type UserWithRelations = User & UserRelations
