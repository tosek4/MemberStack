import { Getter, inject } from '@loopback/core'
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository'
import { PostgresDataSource } from '../../../datasources'
import { Attendance } from '../models'
import { Member } from '../../member/models'
import { MemberRepository } from '../../member/repositories'
import { User } from '../../user/models'
import { UserRepository } from '../../user/repositories'
import { AttendanceListFilters, AttendanceRelations } from '../types'

export class AttendanceRepository extends DefaultCrudRepository<
  Attendance,
  typeof Attendance.prototype.id,
  AttendanceRelations
> {
  public readonly member: BelongsToAccessor<
    Member,
    typeof Attendance.prototype.id
  >

  public readonly createdBy: BelongsToAccessor<
    User,
    typeof Attendance.prototype.id
  >

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
    @repository.getter('MemberRepository')
    protected memberRepositoryGetter: Getter<MemberRepository>,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Attendance, dataSource)

    this.member = this.createBelongsToAccessorFor(
      'member',
      memberRepositoryGetter,
    )
    this.registerInclusionResolver('member', this.member.inclusionResolver)

    this.createdBy = this.createBelongsToAccessorFor(
      'createdBy',
      userRepositoryGetter,
    )
    this.registerInclusionResolver(
      'createdBy',
      this.createdBy.inclusionResolver,
    )
  }

  async findIdsForList(filters?: AttendanceListFilters): Promise<number[]> {
    const search = filters?.search?.trim()
    const status = filters?.status ?? 'all'
    const date = filters?.date?.trim()

    const params: unknown[] = []
    const conditions: string[] = []

    if (search) {
      params.push(`%${search}%`)

      conditions.push(`
      (
        m."firstname" ILIKE $${params.length}
        OR m."lastname" ILIKE $${params.length}
        OR m."email" ILIKE $${params.length}
      )
    `)
    }

    if (status === 'checked-in') {
      conditions.push(`a."checkedoutat" IS NULL`)
    }

    if (status === 'checked-out') {
      conditions.push(`a."checkedoutat" IS NOT NULL`)
    }

    if (date) {
      params.push(date)

      conditions.push(`
      a."checkedinat" >= ($${params.length}::text || 'T00:00:00.000Z')::timestamptz
      AND a."checkedinat" <= ($${params.length}::text || 'T23:59:59.999Z')::timestamptz
    `)
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

    const query = `
    SELECT a."id"
    FROM "attendance" a

    LEFT JOIN "member" m
      ON a."memberid" = m."id"

    ${whereClause}

    ORDER BY a."checkedinat" DESC
  `

    const rows = await this.dataSource.execute(query, params)

    return rows.map((row: { id: number }) => row.id)
  }
}
