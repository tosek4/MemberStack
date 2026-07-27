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
import { MemberSubscription } from '../models'
import { MemberSubscriptionService } from '../service'

export class MemberSubscriptionController {
  constructor(
    @service(MemberSubscriptionService)
    private memberSubscriptionService: MemberSubscriptionService,
  ) {}

  @post('/member-subscriptions')
  @response(200, {
    description: 'MemberSubscription model instance',
    content: {
      'application/json': { schema: getModelSchemaRef(MemberSubscription) },
    },
  })
  create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MemberSubscription, {
            title: 'NewMemberSubscription',
            exclude: ['id'],
          }),
        },
      },
    })
    subscription: Omit<MemberSubscription, 'id'>,
  ): Promise<MemberSubscription> {
    return this.memberSubscriptionService.create(subscription)
  }

  @get('/member-subscriptions/count')
  @response(200, {
    description: 'MemberSubscription model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  count(
    @param.where(MemberSubscription) where?: Where<MemberSubscription>,
  ): Promise<Count> {
    return this.memberSubscriptionService.count(where)
  }

  @get('/member-subscriptions')
  @response(200, {
    description: 'Array of MemberSubscription model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MemberSubscription),
        },
      },
    },
  })
  find(
    @param.filter(MemberSubscription) filter?: Filter<MemberSubscription>,
  ): Promise<MemberSubscription[]> {
    return this.memberSubscriptionService.find(filter)
  }

  @get('/member-subscriptions/{id}')
  @response(200, {
    description: 'MemberSubscription model instance',
    content: {
      'application/json': { schema: getModelSchemaRef(MemberSubscription) },
    },
  })
  findById(@param.path.number('id') id: number): Promise<MemberSubscription> {
    return this.memberSubscriptionService.findById(id)
  }

  @patch('/member-subscriptions/{id}')
  @response(204, { description: 'MemberSubscription PATCH success' })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MemberSubscription, { partial: true }),
        },
      },
    })
    subscription: Partial<MemberSubscription>,
  ): Promise<void> {
    await this.memberSubscriptionService.updateById(id, subscription)
  }

  @del('/member-subscriptions/{id}')
  @response(204, { description: 'MemberSubscription DELETE success' })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.memberSubscriptionService.deleteById(id)
  }
}
