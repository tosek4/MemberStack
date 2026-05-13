import { Entity, model, property } from '@loopback/repository'

@model()
export class Attendance extends Entity {
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
    enum: ['qr', 'nfc', 'manual'],
  })
  attendanceMethod: string

  @property({
    type: 'string',
    required: true,
  })
  createdByUserId?: string

  constructor(data?: Partial<Attendance>) {
    super(data)
  }
}

export interface AttendanceRelations {
  // describe navigational properties here
}

export type AttendanceWithRelations = Attendance & AttendanceRelations
