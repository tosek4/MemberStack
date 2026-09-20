import { service } from '@loopback/core'
import { Count, CountSchema, Filter, Where } from '@loopback/repository'
import {
  api,
  del,
  get,
  param,
  post,
  requestBody,
  response,
} from '@loopback/rest'
import { MemberSubscription } from '../models'
import { MemberSubscriptionService } from '../service'
import {
  CreateMemberSubscriptionRequestSchema,
  CreateMemberSubscriptionResponseSchema,
  MemberSubscriptionCountResponseSchema,
  MemberSubscriptionGetByIdResponseSchema,
  MemberSubscriptionsResponseSchema,
  MemberSubscriptionUpdateResponseSchema,
} from './member-subscription.docs'
import { MemberSubscriptionStatus } from '../types'

@api({ basePath: '/member-subscriptions' })
export class MemberSubscriptionController {
  constructor(
    @service(MemberSubscriptionService)
    private memberSubscriptionService: MemberSubscriptionService,
  ) {}

  @get('/')
  @response(200, MemberSubscriptionsResponseSchema)
  find(
    @param.query.string('search') search?: string,
    @param.query.string('status') status?: string,
  ): Promise<MemberSubscription[]> {
    return this.memberSubscriptionService.find({
      search,
      status: status as MemberSubscriptionStatus | undefined,
    })
  }

  @post('/')
  @response(200, CreateMemberSubscriptionResponseSchema)
  create(
    @requestBody(CreateMemberSubscriptionRequestSchema)
    subscription: Omit<MemberSubscription, 'id'>,
  ): Promise<MemberSubscription> {
    return this.memberSubscriptionService.create(subscription)
  }

  @get('/count')
  @response(200, MemberSubscriptionCountResponseSchema)
  count(
    @param.where(MemberSubscription) where?: Where<MemberSubscription>,
  ): Promise<Count> {
    return this.memberSubscriptionService.count(where)
  }

  @get('/{id}')
  @response(200, MemberSubscriptionGetByIdResponseSchema)
  findById(@param.path.number('id') id: number): Promise<MemberSubscription> {
    return this.memberSubscriptionService.findById(id)
  }
  @response(204, MemberSubscriptionUpdateResponseSchema)
  async updateById(
    @param.path.number('id') id: number,
    @requestBody(CreateMemberSubscriptionRequestSchema)
    subscription: Partial<MemberSubscription>,
  ): Promise<void> {
    await this.memberSubscriptionService.updateById(id, subscription)
  }

  @del('/{id}')
  @response(204, { description: 'MemberSubscription DELETE success' })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.memberSubscriptionService.deleteById(id)
  }
}
