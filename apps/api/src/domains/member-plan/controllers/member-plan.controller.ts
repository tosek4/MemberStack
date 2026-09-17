import { service } from '@loopback/core'
import { Count, Filter, Where } from '@loopback/repository'
import {
  api,
  del,
  get,
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest'
import { MemberPlan } from '../models'
import { MemberPlanService } from '../service'
import { authorize } from '@loopback/authorization'
import { AppRole } from '../../../enums/app-role.enum'
import {
  CreateMemberPlanRequestSchema,
  CreateMemberPlanResponseSchema,
  MemberPlanCountResponseSchema,
  MemberPlanGetByIdResponseSchema,
  MemberPlanResponseSchema,
  MemberPlanUpdateResponseSchema,
  UpdateMemberPlanRequestSchema,
} from './member-plan.docs'

@api({ basePath: '/member-plans' })
@authorize({
  allowedRoles: [AppRole.ADMIN, AppRole.SUPER_ADMIN],
  voters: ['authorization.authorizers.role'],
})
export class MemberPlanController {
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

  @post('/')
  @response(200, CreateMemberPlanResponseSchema)
  create(
    @requestBody(CreateMemberPlanRequestSchema)
    plan: Omit<MemberPlan, 'id'>,
  ): Promise<MemberPlan> {
    return this.memberPlanService.create(plan)
  }

  @get('/count')
  @response(200, MemberPlanCountResponseSchema)
  count(@param.where(MemberPlan) where?: Where<MemberPlan>): Promise<Count> {
    return this.memberPlanService.count(where)
  }

  @get('/{id}')
  @response(200, MemberPlanGetByIdResponseSchema)
  findById(@param.path.number('id') id: number): Promise<MemberPlan> {
    return this.memberPlanService.findById(id)
  }

  @patch('/{id}')
  @response(204, MemberPlanUpdateResponseSchema)
  async updateById(
    @param.path.number('id') id: number,
    @requestBody(UpdateMemberPlanRequestSchema)
    plan: Partial<MemberPlan>,
  ): Promise<void> {
    await this.memberPlanService.updateById(id, plan)
  }

  @del('/{id}')
  @response(204, { description: 'MemberPlan DELETE success' })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.memberPlanService.deleteById(id)
  }
}
