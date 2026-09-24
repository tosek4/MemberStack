import { BindingKey } from '@loopback/core'
import { DailyVisitService } from './service/daily-visit.service'

export const DAILY_VISIT_SERVICE = BindingKey.create<DailyVisitService>(
  'service.daily-visit',
)
