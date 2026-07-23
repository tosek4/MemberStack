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
import { AttendanceRelations } from '../types'

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
}
