import { Getter, inject } from '@loopback/core'
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository'
import { PostgresDataSource } from '../../../datasources'
import { User } from '../models'
import { Role } from '../../role/models'
import { RoleRepository } from '../../role/repositories'
import { RefreshToken } from '../../refresh-token/models'
import { RefreshTokenRepository } from '../../refresh-token/repositories'
import { Member } from '../../member/models'
import { MemberRepository } from '../../member/repositories'
import { Payment } from '../../payment/models'
import { PaymentRepository } from '../../payment/repositories'
import { Attendance } from '../../attendance/models'
import { AttendanceRepository } from '../../attendance/repositories'
import { UserRelations } from '../types'

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly role: BelongsToAccessor<Role, typeof User.prototype.id>

  public readonly refreshTokens: HasManyRepositoryFactory<
    RefreshToken,
    typeof User.prototype.id
  >

  public readonly members: HasManyRepositoryFactory<
    Member,
    typeof User.prototype.id
  >

  public readonly payments: HasManyRepositoryFactory<
    Payment,
    typeof User.prototype.id
  >

  public readonly attendances: HasManyRepositoryFactory<
    Attendance,
    typeof User.prototype.id
  >

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
    @repository.getter('RoleRepository')
    protected roleRepositoryGetter: Getter<RoleRepository>,
    @repository.getter('RefreshTokenRepository')
    protected refreshTokenRepositoryGetter: Getter<RefreshTokenRepository>,
    @repository.getter('MemberRepository')
    protected memberRepositoryGetter: Getter<MemberRepository>,
    @repository.getter('PaymentRepository')
    protected paymentRepositoryGetter: Getter<PaymentRepository>,
    @repository.getter('AttendanceRepository')
    protected attendanceRepositoryGetter: Getter<AttendanceRepository>,
  ) {
    super(User, dataSource)

    this.role = this.createBelongsToAccessorFor('role', roleRepositoryGetter)
    this.registerInclusionResolver('role', this.role.inclusionResolver)

    this.refreshTokens = this.createHasManyRepositoryFactoryFor(
      'refreshTokens',
      refreshTokenRepositoryGetter,
    )
    this.registerInclusionResolver(
      'refreshTokens',
      this.refreshTokens.inclusionResolver,
    )

    this.members = this.createHasManyRepositoryFactoryFor(
      'members',
      memberRepositoryGetter,
    )
    this.registerInclusionResolver('members', this.members.inclusionResolver)

    this.payments = this.createHasManyRepositoryFactoryFor(
      'payments',
      paymentRepositoryGetter,
    )
    this.registerInclusionResolver('payments', this.payments.inclusionResolver)

    this.attendances = this.createHasManyRepositoryFactoryFor(
      'attendances',
      attendanceRepositoryGetter,
    )
    this.registerInclusionResolver(
      'attendances',
      this.attendances.inclusionResolver,
    )
  }
}
