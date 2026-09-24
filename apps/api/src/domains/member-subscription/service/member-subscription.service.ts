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
import { SecurityBindings, securityId, UserProfile } from '@loopback/security'
import { PaymentMethod } from '../../payment/types'
import { PaymentRepository } from '../../payment/repositories'
import { MemberPlanRepository } from '../../member-plan/repositories'

@injectable({ scope: BindingScope.TRANSIENT })
export class MemberSubscriptionService {
  constructor(
    @repository(MemberSubscriptionRepository)
    private memberSubscriptionRepository: MemberSubscriptionRepository,

    @inject(SecurityBindings.USER)
    private readonly currentUser: UserProfile,

    @repository(PaymentRepository)
    private paymentRepository: PaymentRepository,

    @repository(MemberPlanRepository)
    private memberPlanRepository: MemberPlanRepository,
  ) {}

  async create(
    data: Omit<MemberSubscription, 'id' | 'paymentMethod'>,
  ): Promise<MemberSubscription> {
    const { paymentMethod, ...subscriptionData } = data as any
    const memberPlan = await this.memberPlanRepository.findById(
      subscriptionData.membershipPlanId,
    )

    if (memberPlan.status !== 'active') {
      throw new HttpErrors.BadRequest(
        `Cannot create subscription with plan status ${memberPlan.status}`,
      )
    }

    const newSubscription =
      await this.memberSubscriptionRepository.create(subscriptionData)
    const currentDate = new Date()
    const createdByUserId = Number(this.currentUser[securityId])

    await this.paymentRepository.create({
      memberId: newSubscription.memberId,
      memberSubscriptionId: newSubscription.id!,
      amount: memberPlan.price,
      paymentMethod,
      status: 'paid',
      paidAt: currentDate,
      createdByUserId,
    })

    return newSubscription
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

  async renewSubscription(
    id: number,
    paymentMethod: PaymentMethod,
  ): Promise<void> {
    const subscription = await this.findById(id)

    if (subscription.membershipPlan?.status !== 'active') {
      throw new HttpErrors.BadRequest(
        `Cannot renew subscription with plan status ${subscription.membershipPlan?.status}`,
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

    const newSubscription = await this.memberSubscriptionRepository.create({
      memberId: subscription.memberId,
      membershipPlanId: subscription.membershipPlanId,
      startedAt: currentDate,
      expiresAt: newExpiryDate,
      status: 'active',
      createdByUserId: createdByUserId,
    })

    await this.paymentRepository.create({
      memberId: subscription.memberId,
      memberSubscriptionId: newSubscription.id!,
      amount: subscription.membershipPlan?.price,
      paymentMethod,
      status: 'paid',
      paidAt: currentDate,
      createdByUserId,
    })
  }
}
