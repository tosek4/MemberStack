import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { PostgresDataSource } from '../../../datasources';
import { Role } from '../models';
import { User } from '../../user/models';
import { UserRepository } from '../../user/repositories';
import { RoleRelations } from '../types';
export declare class RoleRepository extends DefaultCrudRepository<Role, typeof Role.prototype.id, RoleRelations> {
    protected userRepositoryGetter: Getter<UserRepository>;
    readonly users: HasManyRepositoryFactory<User, typeof Role.prototype.id>;
    constructor(dataSource: PostgresDataSource, userRepositoryGetter: Getter<UserRepository>);
}
