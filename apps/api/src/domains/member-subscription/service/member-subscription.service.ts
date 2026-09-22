import { BindingScope, inject, injectable } from '@loopback/core'
import {
  Count,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository'
import { HttpErrors } from '@loopback/rest'
import { MemberSubscription, MemberSubscriptionWithRelations } from '../models'
import { MemberSubscriptionRepository } from '../repositories'
import { MemberSubscriptionFilters } from '../types'
import { SecurityBindings } from '@loopback/security'
import { securityId, UserProfile } from '@loopback/security'

@injectable({ scope: BindingScope.TRANSIENT })
export class MemberSubscriptionService {
  constructor(
    @repository(MemberSubscriptionRepository)
    private memberSubscriptionRepository: MemberSubscriptionRepository,

    @inject(SecurityBindings.USER)
    private readonly currentUser: UserProfile,
  ) {}

  create(data: Omit<MemberSubscription, 'id'>): Promise<MemberSubscription> {
    return this.memberSubscriptionRepository.create(data)
  }

  async find(
    filters?: MemberSubscriptionFilters,
  ): Promise<MemberSubscription[]> {
    const subscriptionIds =
      await this.memberSubscriptionRepository.findIdsForList(filters)

    if (subscriptionIds.length === 0) {
      return []
    }

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
  ): Promise<MemberSubscriptionWithRelations> {
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

  async renewSubscription(id: number): Promise<void> {
    const subscription = await this.findById(id)

    if (subscription.status !== 'active') {
      throw new HttpErrors.BadRequest(
        `Cannot renew subscription with status ${subscription.status}`,
      )
    }

    const durationInDays = subscription.membershipPlan?.duration
    const createdByUserId = Number(this.currentUser[securityId])
    const currentDate = new Date()

    if (!durationInDays || durationInDays <= 0) {
      throw new HttpErrors.BadRequest(
        'Cannot renew subscription because the membership plan has an invalid duration',
      )
    }

    if (!createdByUserId) {
      throw new HttpErrors.Unauthorized('Authenticated user not found')
    }

    const newExpiryDate = new Date(currentDate)
    newExpiryDate.setDate(newExpiryDate.getDate() + durationInDays)

    await this.memberSubscriptionRepository.create({
      memberId: subscription.memberId,
      membershipPlanId: subscription.membershipPlanId,
      startedAt: currentDate,
      expiresAt: newExpiryDate,
      status: 'active',
      createdByUserId: createdByUserId,
    })
  }
}
