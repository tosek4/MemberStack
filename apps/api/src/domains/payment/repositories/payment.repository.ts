import { Getter, inject } from '@loopback/core'
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository'
import { PostgresDataSource } from '../../../datasources'
import { Payment } from '../models'
import { Member } from '../../member/models'
import { MemberRepository } from '../../member/repositories'
import { MemberSubscription } from '../../member-subscription/models'
import { MemberSubscriptionRepository } from '../../member-subscription/repositories'
import { User } from '../../user/models'
import { UserRepository } from '../../user/repositories'
import { PaymentRelations } from '../types'

export class PaymentRepository extends DefaultCrudRepository<
  Payment,
  typeof Payment.prototype.id,
  PaymentRelations
> {
  public readonly member: BelongsToAccessor<Member, typeof Payment.prototype.id>

  public readonly memberSubscription: BelongsToAccessor<
    MemberSubscription,
    typeof Payment.prototype.id
  >

  public readonly createdBy: BelongsToAccessor<User, typeof Payment.prototype.id>

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
    @repository.getter('MemberRepository')
    protected memberRepositoryGetter: Getter<MemberRepository>,
    @repository.getter('MemberSubscriptionRepository')
    protected memberSubscriptionRepositoryGetter: Getter<MemberSubscriptionRepository>,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Payment, dataSource)

    this.member = this.createBelongsToAccessorFor(
      'member',
      memberRepositoryGetter,
    )
    this.registerInclusionResolver('member', this.member.inclusionResolver)

    this.memberSubscription = this.createBelongsToAccessorFor(
      'memberSubscription',
      memberSubscriptionRepositoryGetter,
    )
    this.registerInclusionResolver(
      'memberSubscription',
      this.memberSubscription.inclusionResolver,
    )

    this.createdBy = this.createBelongsToAccessorFor(
      'createdBy',
      userRepositoryGetter,
    )
    this.registerInclusionResolver('createdBy', this.createdBy.inclusionResolver)
  }
}
