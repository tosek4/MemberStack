import { BindingScope, injectable } from '@loopback/core'
import {
  Count,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository'
import { HttpErrors } from '@loopback/rest'
import { Payment } from '../models'
import { PaymentRepository } from '../repositories'
import { PaymentListFilters, PaymentListItem } from '../types'

@injectable({ scope: BindingScope.TRANSIENT })
export class PaymentService {
  constructor(
    @repository(PaymentRepository)
    private paymentRepository: PaymentRepository,
  ) {}

  create(data: Omit<Payment, 'id'>): Promise<Payment> {
    return this.paymentRepository.create(data)
  }

  async find(filters?: PaymentListFilters): Promise<PaymentListItem[]> {
    const paymentIds = await this.paymentRepository.findIdsForList(filters)

    if (paymentIds.length === 0) {
      return []
    }

    const payments = await this.paymentRepository.find({
      where: {
        id: {
          inq: paymentIds,
        },
      },
      include: [
        'member',
        {
          relation: 'memberSubscription',
          scope: {
            include: ['membershipPlan'],
          },
        },
      ],
      order: ['paidAt DESC'],
    })

    return payments.map((payment) => {
      const member = payment.member
      const subscription = payment.memberSubscription
      const membershipPlan = subscription?.membershipPlan

      return {
        id: payment.id!,
        memberId: payment.memberId,
        memberName: member ? `${member.firstName} ${member.lastName}` : '',
        memberEmail: member?.email ?? '',
        memberSubscriptionId: payment.memberSubscriptionId,
        planName: membershipPlan?.name ?? '',
        amount: payment.amount as number,
        currency: 'EUR',
        method: payment.paymentMethod,
        status: payment.status as string,
        paymentDate: payment.paidAt as Date,
        reference: payment.transactionReference ?? undefined,
      }
    })
  }

  async findById(
    id: number,
    filter?: FilterExcludingWhere<Payment>,
  ): Promise<Payment> {
    try {
      return await this.paymentRepository.findById(id, filter)
    } catch {
      throw new HttpErrors.NotFound(`Payment ${id} not found`)
    }
  }

  count(where?: Where<Payment>): Promise<Count> {
    return this.paymentRepository.count(where)
  }

  async updateById(id: number, data: Partial<Payment>): Promise<void> {
    await this.findById(id)
    await this.paymentRepository.updateById(id, data)
  }

  async deleteById(id: number): Promise<void> {
    await this.findById(id)
    await this.paymentRepository.deleteById(id)
  }
}
