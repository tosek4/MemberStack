import { Getter, inject } from '@loopback/core'
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository'

import { DailyVisit } from '../models/daily-visit.model'
import { MemberPlanRepository } from '../../member-plan/repositories/member-plan.repository'
import { PostgresDataSource } from '../../../datasources'
import { Attendance } from '../../attendance/models'
import { AttendanceRepository } from '../../attendance/repositories'
import { MemberPlan } from '../../member-plan/models'

export class DailyVisitRepository extends DefaultCrudRepository<
  DailyVisit,
  typeof DailyVisit.prototype.id
> {
  public readonly attendances: HasManyRepositoryFactory<
    Attendance,
    typeof DailyVisit.prototype.id
  >

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,

    @repository(MemberPlanRepository)
    protected memberPlanRepository: MemberPlanRepository,

    @repository.getter('AttendanceRepository')
    protected attendanceRepositoryGetter: Getter<AttendanceRepository>,
  ) {
    super(DailyVisit, dataSource)

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
