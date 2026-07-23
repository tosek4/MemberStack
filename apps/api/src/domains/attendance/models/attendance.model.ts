import { belongsTo, Entity, model, property } from '@loopback/repository'
import { Member } from '../../member/models'
import { User } from '../../user/models'
import { AttendanceRelations } from '../types'

@model()
export class Attendance extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number

  @property({
    type: 'timestamp',
    required: true,
  })
  checkedInAt?: string

  @property({
    type: 'timestamp',
  })
  checkedOutAt?: string

  @property({
    type: 'enum',
    required: true,
    members: ['qr', 'nfc', 'manual'],
  })
  attendanceMethod: string

  // relations
  @belongsTo(() => Member)
  memberId: number

  @belongsTo(() => User, { name: 'createdBy' })
  createdByUserId: number

  constructor(data?: Partial<Attendance>) {
    super(data)
  }
}

export type AttendanceWithRelations = Attendance & AttendanceRelations
