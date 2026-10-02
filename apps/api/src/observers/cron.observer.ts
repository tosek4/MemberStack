import { inject, LifeCycleObserver, lifeCycleObserver } from '@loopback/core'
import cron from 'node-cron'

import { MEMBER_SUBSCRIPTION_EXPIRATION_SERVICE } from '../domains/member-subscription/keys'
import { SubscriptionExpirationService } from '../domains/member-subscription/services/subscription-expiration.service'

@lifeCycleObserver('cron')
export class CronObserver implements LifeCycleObserver {
  constructor(
    @inject(MEMBER_SUBSCRIPTION_EXPIRATION_SERVICE)
    private readonly subscriptionExpirationService: SubscriptionExpirationService,
  ) {}

  async start(): Promise<void> {
    // run evert minute '* * * * *',
    // run evert day at 2:00 AM '0 2 * * *',
    cron.schedule(
      '0 2 * * *',
      async () => {
        await this.subscriptionExpirationService.expireSubscriptions()
        await this.subscriptionExpirationService.notifyExpiringSubscriptions()
      },
      {
        timezone: 'Europe/Skopje',
      },
    )

    console.log(
      '[CronObserver] Subscription expiration scheduled for every day at 02:00.',
    )
  }

  async stop(): Promise<void> {
    // Nothing to clean up for now.
  }
}
