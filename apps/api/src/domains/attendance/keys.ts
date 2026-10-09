import { BindingKey } from '@loopback/core'
import { AttendanceService } from './service'
import { AttendanceAutoCheckoutService } from './service/attendance-autocheckout.service'

export const ATTENDANCE_SERVICE =
  BindingKey.create<AttendanceService>('service.attendance')

export const ATTENDANCE_AUTO_CHECKOUT_SERVICE =
  BindingKey.create<AttendanceAutoCheckoutService>(
    'service.attendance-auto-checkout',
  )
