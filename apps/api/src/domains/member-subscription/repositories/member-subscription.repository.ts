import { inject } from '@loopback/core'
import { DefaultCrudRepository } from '@loopback/repository'
import { PostgresDataSource } from '../../../datasources'
import { MemberSubscription, MemberSubscriptionRelations } from '../models'

export class MemberSubscriptionRepository extends DefaultCrudRepository<
  MemberSubscription,
  typeof MemberSubscription.prototype.id,
  MemberSubscriptionRelations
> {
  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    super(MemberSubscription, dataSource)
  }
}
