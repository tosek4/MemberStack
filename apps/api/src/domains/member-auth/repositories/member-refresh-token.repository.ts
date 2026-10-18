import { inject } from '@loopback/core'
import { DefaultCrudRepository } from '@loopback/repository'
import { PostgresDataSource } from '../../../datasources'
import { MemberRefreshToken } from '../models'

export class MemberRefreshTokenRepository extends DefaultCrudRepository<
  MemberRefreshToken,
  typeof MemberRefreshToken.prototype.id
> {
  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    super(MemberRefreshToken, dataSource)
  }
}
