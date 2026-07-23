import { Getter, inject } from '@loopback/core'
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository'
import { PostgresDataSource } from '../../../datasources'
import { RefreshToken } from '../models'
import { User } from '../../user/models'
import { UserRepository } from '../../user/repositories'
import { RefreshTokenRelations } from '../types'

export class RefreshTokenRepository extends DefaultCrudRepository<
  RefreshToken,
  typeof RefreshToken.prototype.id,
  RefreshTokenRelations
> {
  public readonly user: BelongsToAccessor<User, typeof RefreshToken.prototype.id>

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(RefreshToken, dataSource)

    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter)
    this.registerInclusionResolver('user', this.user.inclusionResolver)
  }
}
