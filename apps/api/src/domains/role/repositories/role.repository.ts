import { Getter, inject } from '@loopback/core'
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository'
import { PostgresDataSource } from '../../../datasources'
import { Role } from '../models'
import { User } from '../../user/models'
import { UserRepository } from '../../user/repositories'
import { RoleRelations } from '../types'

export class RoleRepository extends DefaultCrudRepository<
  Role,
  typeof Role.prototype.id,
  RoleRelations
> {
  public readonly users: HasManyRepositoryFactory<
    User,
    typeof Role.prototype.id
  >

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Role, dataSource)
    // Register the relation factory
    this.users = this.createHasManyRepositoryFactoryFor(
      'users',
      userRepositoryGetter,
    )

    // Allows you to run queries like: roleRepository.find({include: ['users']})
    this.registerInclusionResolver('users', this.users.inclusionResolver)
  }
}
