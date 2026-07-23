import { Getter, inject } from '@loopback/core'
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository'
import { PostgresDataSource } from '../../../datasources'
import { Member } from '../models'
import { User } from '../../user/models'
import { UserRepository } from '../../user/repositories'
import { Attendance } from '../../attendance/models'
import { AttendanceRepository } from '../../attendance/repositories'
import { Payment } from '../../payment/models'
import { PaymentRepository } from '../../payment/repositories'
import { MemberSubscription } from '../../member-subscription/models'
import { MemberSubscriptionRepository } from '../../member-subscription/repositories'
import { MemberRelations } from '../types'

export class MemberRepository extends DefaultCrudRepository<
  Member,
  typeof Member.prototype.id,
  MemberRelations
> {
  public readonly createdBy: BelongsToAccessor<User, typeof Member.prototype.id>

  public readonly attendances: HasManyRepositoryFactory<
    Attendance,
    typeof Member.prototype.id
  >

  public readonly payments: HasManyRepositoryFactory<
    Payment,
    typeof Member.prototype.id
  >

  public readonly subscriptions: HasManyRepositoryFactory<
    MemberSubscription,
    typeof Member.prototype.id
  >

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
    @repository.getter('AttendanceRepository')
    protected attendanceRepositoryGetter: Getter<AttendanceRepository>,
    @repository.getter('PaymentRepository')
    protected paymentRepositoryGetter: Getter<PaymentRepository>,
    @repository.getter('MemberSubscriptionRepository')
    protected memberSubscriptionRepositoryGetter: Getter<MemberSubscriptionRepository>,
  ) {
    super(Member, dataSource)

    this.createdBy = this.createBelongsToAccessorFor(
      'createdBy',
      userRepositoryGetter,
    )
    this.registerInclusionResolver('createdBy', this.createdBy.inclusionResolver)

    this.attendances = this.createHasManyRepositoryFactoryFor(
      'attendances',
      attendanceRepositoryGetter,
    )
    this.registerInclusionResolver(
      'attendances',
      this.attendances.inclusionResolver,
    )

    this.payments = this.createHasManyRepositoryFactoryFor(
      'payments',
      paymentRepositoryGetter,
    )
    this.registerInclusionResolver('payments', this.payments.inclusionResolver)

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
