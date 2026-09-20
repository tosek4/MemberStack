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
import { UserListFilters, UserRelations } from '../types'

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

  async findIdsForList(filters?: UserListFilters): Promise<number[]> {
    const search = filters?.search?.trim()
    const role = filters?.role ?? 'all'
    const status = filters?.status ?? 'all'
    const params: unknown[] = []
    const conditions: string[] = []

    if (search) {
      params.push(`%${search}%`)

      conditions.push(`
        (
          u."firstname" ILIKE $${params.length}
          OR u."lastname" ILIKE $${params.length}
          OR u."email" ILIKE $${params.length}
          OR u."phone" ILIKE $${params.length}
        )
      `)
    }

    if (status !== 'all') {
      const dbStatus = status === 'active' ? true : false

      params.push(dbStatus)

      conditions.push(`
        u."isactive" = $${params.length}
      `)
    }

    if (role !== 'all') {
      params.push(Number(role))

      conditions.push(`
        r."id" = $${params.length}
      `)
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

    const query = `
      SELECT u."id"
      FROM "user" u
      LEFT JOIN "role" r
        ON u."roleid" = r."id"
  
      ${whereClause}
  
      ORDER BY u."createdat" DESC
    `

    const rows = await this.dataSource.execute(query, params)

    return rows.map((row: { id: number }) => row.id)
  }
}
