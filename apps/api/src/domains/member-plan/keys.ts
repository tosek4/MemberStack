import { BindingKey } from '@loopback/core'
import { MemberPlanService } from './service'

export const MEMBER_PLAN_SERVICE = BindingKey.create<MemberPlanService>(
  'service.member-plan',
)
