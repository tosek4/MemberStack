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

@injectable({ scope: BindingScope.TRANSIENT })
export class MemberSubscriptionService {
  constructor(
    @repository(MemberSubscriptionRepository)
    private memberSubscriptionRepository: MemberSubscriptionRepository,
  ) {}

  create(data: Omit<MemberSubscription, 'id'>): Promise<MemberSubscription> {
    return this.memberSubscriptionRepository.create(data)
  }

  find(filter?: Filter<MemberSubscription>): Promise<MemberSubscription[]> {
    return this.memberSubscriptionRepository.find(filter)
  }

  async findById(
    id: number,
    filter?: FilterExcludingWhere<MemberSubscription>,
  ): Promise<MemberSubscription> {
    try {
      return await this.memberSubscriptionRepository.findById(id, filter)
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
