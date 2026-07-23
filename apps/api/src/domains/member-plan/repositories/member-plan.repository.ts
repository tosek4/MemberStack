import { Getter, inject } from '@loopback/core'
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository'
import { PostgresDataSource } from '../../../datasources'
import { MemberPlan } from '../models'
import { MemberSubscription } from '../../member-subscription/models'
import { MemberSubscriptionRepository } from '../../member-subscription/repositories'
import { MemberPlanRelations } from '../types'

export class MemberPlanRepository extends DefaultCrudRepository<
  MemberPlan,
  typeof MemberPlan.prototype.id,
  MemberPlanRelations
> {
  public readonly subscriptions: HasManyRepositoryFactory<
    MemberSubscription,
    typeof MemberPlan.prototype.id
  >

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
    @repository.getter('MemberSubscriptionRepository')
    protected memberSubscriptionRepositoryGetter: Getter<MemberSubscriptionRepository>,
  ) {
    super(MemberPlan, dataSource)

    this.subscriptions = this.createHasManyRepositoryFactoryFor(
      'subscriptions',
      memberSubscriptionRepositoryGetter,
    )
    this.registerInclusionResolver(
      'subscriptions',
      this.subscriptions.inclusionResolver,
    )
  }
}
