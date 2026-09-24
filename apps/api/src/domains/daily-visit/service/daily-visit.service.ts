import { HttpErrors } from '@loopback/rest'
import { BindingScope, inject, injectable } from '@loopback/core'
import { repository } from '@loopback/repository'
import { SecurityBindings, securityId, UserProfile } from '@loopback/security'

import { MemberPlanRepository } from '../../member-plan/repositories/member-plan.repository'
import { DailyVisit } from '../models/daily-visit.model'
import { DailyVisitRepository } from '../repositories'
import { CreateDailyVisitData, CreateDailyVisitPayload } from '../types'
import { PaymentRepository } from '../../payment/repositories'
import { PaymentMethod } from '../../payment/types'

@injectable({ scope: BindingScope.TRANSIENT })
export class DailyVisitService {
  constructor(
    @repository(DailyVisitRepository)
    private readonly dailyVisitRepository: DailyVisitRepository,

    @inject(SecurityBindings.USER)
    private readonly currentUser: UserProfile,

    @repository(MemberPlanRepository)
    private readonly memberPlanRepository: MemberPlanRepository,

    @repository(PaymentRepository)
    private readonly paymentRepository: PaymentRepository,
  ) {}

  async find(): Promise<DailyVisit[]> {
    return this.dailyVisitRepository.find()
  }

  async findCount(): Promise<number> {
    const dailyVisitsCount = await this.dailyVisitRepository.count()

    return dailyVisitsCount.count
  }

  async createDailyVisit(data: CreateDailyVisitPayload): Promise<DailyVisit> {
    const plan = await this.memberPlanRepository.findById(data.membershipPlanId)

    if (plan.status !== 'active') {
      throw new HttpErrors.BadRequest(
        'Cannot create a daily visit with an inactive membership plan',
      )
    }

    const createdByUserId = Number(this.currentUser[securityId])

    if (!createdByUserId) {
      throw new HttpErrors.Unauthorized('Authenticated user not found')
    }

    const now = new Date()

    const dailyVisit = await this.dailyVisitRepository.create({
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      visitDate: now,
      checkedInAt: now,
      status: 'checked_in',
      membershipPlanId: data.membershipPlanId,
      createdByUserId,
    })

    await this.paymentRepository.create({
      amount: plan.price,
      paymentMethod: data.paymentMethod,
      paidAt: now,
      status: 'paid',
      dailyVisitId: dailyVisit.id!,
      createdByUserId,
    })

    return dailyVisit
  }
}
