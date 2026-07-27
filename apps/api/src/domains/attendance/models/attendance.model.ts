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
    type: 'date',
    required: true,
  })
  checkedInAt: Date

  @property({
    type: 'date',
  })
  checkedOutAt: Date

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['qr', 'nfc', 'manual'],
    },
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
