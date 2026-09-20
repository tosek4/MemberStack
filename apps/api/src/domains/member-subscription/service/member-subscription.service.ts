import { BindingScope, injectable } from '@loopback/core'
import {
  Count,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository'
import { HttpErrors } from '@loopback/rest'
import { MemberSubscription } from '../models'
import { MemberSubscriptionRepository } from '../repositories'
import { MemberSubscriptionFilters } from '../types'

@injectable({ scope: BindingScope.TRANSIENT })
export class MemberSubscriptionService {
  constructor(
    @repository(MemberSubscriptionRepository)
    private memberSubscriptionRepository: MemberSubscriptionRepository,
  ) {}

  create(data: Omit<MemberSubscription, 'id'>): Promise<MemberSubscription> {
    return this.memberSubscriptionRepository.create(data)
  }

  async find(
    filters?: MemberSubscriptionFilters,
  ): Promise<MemberSubscription[]> {
    const subscriptionIds =
      await this.memberSubscriptionRepository.findIdsForList(filters)

    return this.memberSubscriptionRepository.find({
      where: {
        id: { inq: subscriptionIds },
      },
      include: ['member', 'membershipPlan'],
      order: ['id DESC'],
    })
  }

  async findById(
    id: number,
    filter?: FilterExcludingWhere<MemberSubscription>,
  ): Promise<MemberSubscription> {
    try {
      return await this.memberSubscriptionRepository.findById(id, {
        include: ['member', 'membershipPlan'],
        ...filter,
      })
    } catch {
      throw new HttpErrors.NotFound(`MemberSubscription ${id} not found`)
    }
  }

  count(where?: Where<MemberSubscription>): Promise<Count> {
    return this.memberSubscriptionRepository.count(where)
  }

  async updateById(
    id: number,
    data: Partial<MemberSubscription>,
  ): Promise<void> {
    await this.findById(id)
    await this.memberSubscriptionRepository.updateById(id, data)
  }

  async deleteById(id: number): Promise<void> {
    await this.findById(id)
    await this.memberSubscriptionRepository.deleteById(id)
  }
}
