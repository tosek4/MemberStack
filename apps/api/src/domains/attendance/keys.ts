import { BindingKey } from '@loopback/core'
import { AttendanceService } from './service'

export const ATTENDANCE_SERVICE =
  BindingKey.create<AttendanceService>('service.attendance')
