import { service } from '@loopback/core'
import { Filter } from '@loopback/repository'
import { api, get, param, response } from '@loopback/rest'
import { MemberPlan } from '../models'
import { MemberPlanService } from '../service'

import { MemberPlanResponseSchema } from './member-plan.docs'

@api({ basePath: '/member-plans/public' })
export class PublicMemberPlanController {
  constructor(
    @service(MemberPlanService)
    private memberPlanService: MemberPlanService,
  ) {}

  @get('/')
  @response(200, MemberPlanResponseSchema)
  find(
    @param.filter(MemberPlan) filter?: Filter<MemberPlan>,
  ): Promise<MemberPlan[]> {
    return this.memberPlanService.getAllMemberPlans(filter)
  }
}
