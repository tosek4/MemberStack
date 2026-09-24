import { inject } from '@loopback/core'
import { DefaultCrudRepository, repository } from '@loopback/repository'

import { DailyVisit } from '../models/daily-visit.model'
import { MemberPlanRepository } from '../../member-plan/repositories/member-plan.repository'
import { PostgresDataSource } from '../../../datasources'

export class DailyVisitRepository extends DefaultCrudRepository<
  DailyVisit,
  typeof DailyVisit.prototype.id
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,

    @repository(MemberPlanRepository)
    protected memberPlanRepository: MemberPlanRepository,
  ) {
    super(DailyVisit, dataSource)
  }
}
