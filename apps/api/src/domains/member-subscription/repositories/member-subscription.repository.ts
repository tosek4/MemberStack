import { Getter, inject } from '@loopback/core'
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository'
import { PostgresDataSource } from '../../../datasources'
import { MemberSubscription } from '../models'
import { Member } from '../../member/models'
import { MemberRepository } from '../../member/repositories'
import { MemberPlan } from '../../member-plan/models'
import { MemberPlanRepository } from '../../member-plan/repositories'
import { User } from '../../user/models'
import { UserRepository } from '../../user/repositories'
import { Payment } from '../../payment/models'
import { PaymentRepository } from '../../payment/repositories'
import { MemberSubscriptionRelations } from '../types'

export class MemberSubscriptionRepository extends DefaultCrudRepository<
  MemberSubscription,
  typeof MemberSubscription.prototype.id,
  MemberSubscriptionRelations
> {
  public readonly member: BelongsToAccessor<
    Member,
    typeof MemberSubscription.prototype.id
  >

  public readonly membershipPlan: BelongsToAccessor<
    MemberPlan,
    typeof MemberSubscription.prototype.id
  >

  public readonly createdBy: BelongsToAccessor<
    User,
    typeof MemberSubscription.prototype.id
  >

  public readonly payments: HasManyRepositoryFactory<
    Payment,
    typeof MemberSubscription.prototype.id
  >

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
    @repository.getter('MemberRepository')
    protected memberRepositoryGetter: Getter<MemberRepository>,
    @repository.getter('MemberPlanRepository')
    protected memberPlanRepositoryGetter: Getter<MemberPlanRepository>,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
    @repository.getter('PaymentRepository')
    protected paymentRepositoryGetter: Getter<PaymentRepository>,
  ) {
    super(MemberSubscription, dataSource)

    this.member = this.createBelongsToAccessorFor(
      'member',
      memberRepositoryGetter,
    )
    this.registerInclusionResolver('member', this.member.inclusionResolver)

    this.membershipPlan = this.createBelongsToAccessorFor(
      'membershipPlan',
      memberPlanRepositoryGetter,
    )
    this.registerInclusionResolver(
      'membershipPlan',
      this.membershipPlan.inclusionResolver,
    )

    this.createdBy = this.createBelongsToAccessorFor(
      'createdBy',
      userRepositoryGetter,
    )
    this.registerInclusionResolver('createdBy', this.createdBy.inclusionResolver)

    this.payments = this.createHasManyRepositoryFactoryFor(
      'payments',
      paymentRepositoryGetter,
    )
    this.registerInclusionResolver('payments', this.payments.inclusionResolver)
  }
}
