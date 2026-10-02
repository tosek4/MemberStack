import { inject, injectable } from '@loopback/core'
import { repository } from '@loopback/repository'

import { MemberRepository } from '../../member/repositories/member.repository'
import { MemberSubscriptionRepository } from '../repositories/member-subscription.repository'
import { EmailService } from '../../../services/email/email.services'

@injectable()
export class SubscriptionExpirationService {
  constructor(
    @repository(MemberSubscriptionRepository)
    private readonly memberSubscriptionRepository: MemberSubscriptionRepository,

    @repository(MemberRepository)
    private readonly memberRepository: MemberRepository,

    @inject('service.email')
    private readonly emailService: EmailService,
  ) {}

  async expireSubscriptions(): Promise<void> {
    const now = new Date()

    const subscriptions = await this.memberSubscriptionRepository.find({
      where: {
        status: 'active',
        expiresAt: {
          lt: now,
        },
      },
    })

    if (subscriptions.length === 0) {
      console.log('[SubscriptionExpirationService] No subscriptions to expire.')

      return
    }

    for (const subscription of subscriptions) {
      await this.memberSubscriptionRepository.updateById(subscription.id, {
        status: 'expired',
      })

      console.log(
        `[SubscriptionExpirationService] Subscription ${subscription.id} marked as expired.`,
      )
    }

    console.log(
      `[SubscriptionExpirationService] Expired ${subscriptions.length} subscription(s).`,
    )
  }

  async notifyExpiringSubscriptions(): Promise<void> {
    const now = new Date()

    const startOfToday = new Date(now)
    startOfToday.setHours(0, 0, 0, 0)

    const targetDate = new Date(startOfToday)
    targetDate.setDate(targetDate.getDate() + 7)

    const endOfTargetDate = new Date(targetDate)
    endOfTargetDate.setDate(endOfTargetDate.getDate() + 1)

    const subscriptions = await this.memberSubscriptionRepository.find({
      where: {
        status: 'active',
        expiresAt: {
          gte: targetDate,
          lt: endOfTargetDate,
        },
        expirationNotificationSentAt: {
          eq: null as unknown as Date,
        },
      },
    })

    if (subscriptions.length === 0) {
      console.log(
        '[SubscriptionExpirationService] No subscriptions expiring in 7 days.',
      )

      return
    }

    for (const subscription of subscriptions) {
      try {
        const member = await this.memberRepository.findById(
          subscription.memberId,
        )

        if (!member.email) {
          console.warn(
            `[SubscriptionExpirationService] Member ${member.id} has no email.`,
          )

          continue
        }

        await this.emailService.sendMembershipExpirationEmail({
          to: member.email,
          memberName: member.firstName,
          expiresAt: subscription.expiresAt,
        })
        await this.memberSubscriptionRepository.updateById(subscription.id, {
          expirationNotificationSentAt: new Date(),
        })

        console.log(
          `[SubscriptionExpirationService] Expiration email sent for subscription ${subscription.id}.`,
        )
      } catch (error) {
        console.error(
          `[SubscriptionExpirationService] Failed to notify subscription ${subscription.id}:`,
          error,
        )
      }
    }
  }
}
