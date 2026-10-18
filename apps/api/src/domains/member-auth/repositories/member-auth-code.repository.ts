import { inject } from '@loopback/core'
import { DefaultCrudRepository } from '@loopback/repository'
import { PostgresDataSource } from '../../../datasources'
import { MemberAuthCode } from '../models'

export class MemberAuthCodeRepository extends DefaultCrudRepository<
  MemberAuthCode,
  typeof MemberAuthCode.prototype.id
> {
  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    super(MemberAuthCode, dataSource)
  }
}
