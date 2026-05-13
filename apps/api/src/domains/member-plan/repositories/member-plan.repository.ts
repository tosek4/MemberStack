import { inject } from '@loopback/core'
import { DefaultCrudRepository } from '@loopback/repository'
import { PostgresDataSource } from '../../../datasources'
import { MemberPlan, MemberPlanRelations } from '../models'

export class MemberPlanRepository extends DefaultCrudRepository<
  MemberPlan,
  typeof MemberPlan.prototype.id,
  MemberPlanRelations
> {
  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    super(MemberPlan, dataSource)
  }
}
