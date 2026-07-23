import { Getter } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository } from '@loopback/repository';
import { PostgresDataSource } from '../../../datasources';
import { RefreshToken } from '../models';
import { User } from '../../user/models';
import { UserRepository } from '../../user/repositories';
import { RefreshTokenRelations } from '../types';
export declare class RefreshTokenRepository extends DefaultCrudRepository<RefreshToken, typeof RefreshToken.prototype.id, RefreshTokenRelations> {
    protected userRepositoryGetter: Getter<UserRepository>;
    readonly user: BelongsToAccessor<User, typeof RefreshToken.prototype.id>;
    constructor(dataSource: PostgresDataSource, userRepositoryGetter: Getter<UserRepository>);
}
