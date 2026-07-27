import { service } from '@loopback/core'
import { Count, CountSchema, Filter, Where } from '@loopback/repository'
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest'
import { MemberPlan } from '../models'
import { MemberPlanService } from '../service'

export class MemberPlanController {
  constructor(
    @service(MemberPlanService)
    private memberPlanService: MemberPlanService,
  ) {}

  @post('/member-plans')
  @response(200, {
    description: 'MemberPlan model instance',
    content: { 'application/json': { schema: getModelSchemaRef(MemberPlan) } },
  })
  create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MemberPlan, {
            title: 'NewMemberPlan',
            exclude: ['id'],
          }),
        },
      },
    })
    plan: Omit<MemberPlan, 'id'>,
  ): Promise<MemberPlan> {
    return this.memberPlanService.create(plan)
  }

  @get('/member-plans/count')
  @response(200, {
    description: 'MemberPlan model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  count(@param.where(MemberPlan) where?: Where<MemberPlan>): Promise<Count> {
    return this.memberPlanService.count(where)
  }

  @get('/member-plans')
  @response(200, {
    description: 'Array of MemberPlan model instances',
    content: {
      'application/json': {
        schema: { type: 'array', items: getModelSchemaRef(MemberPlan) },
      },
    },
  })
  find(
    @param.filter(MemberPlan) filter?: Filter<MemberPlan>,
  ): Promise<MemberPlan[]> {
    return this.memberPlanService.find(filter)
  }

  @get('/member-plans/{id}')
  @response(200, {
    description: 'MemberPlan model instance',
    content: { 'application/json': { schema: getModelSchemaRef(MemberPlan) } },
  })
  findById(@param.path.number('id') id: number): Promise<MemberPlan> {
    return this.memberPlanService.findById(id)
  }

  @patch('/member-plans/{id}')
  @response(204, { description: 'MemberPlan PATCH success' })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MemberPlan, { partial: true }),
        },
      },
    })
    plan: Partial<MemberPlan>,
  ): Promise<void> {
    await this.memberPlanService.updateById(id, plan)
  }

  @del('/member-plans/{id}')
  @response(204, { description: 'MemberPlan DELETE success' })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.memberPlanService.deleteById(id)
  }
}
